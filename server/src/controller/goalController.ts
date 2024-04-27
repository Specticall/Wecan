import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../../prisma/prisma";

const DEFAULT_USER_GOAL = 150_000;

const difficultyRange = [
  { difficulty: "Easy", min: 50000, max: 150000 },
  { difficulty: "Medium", min: 200000, max: 350000 },
  { difficulty: "Hard", min: 40000, max: 500000 },
] as const;

const findDifficulty = (point: number) => {
  const range = difficultyRange.find(
    (range) => range.min <= point && point <= range.max
  );
  if (!range) throw new Error(`No difficulty from ${point} points was found`);
  return range.difficulty;
};

export const createGoal = async ({
  userId,
  target,
}: {
  userId: string;
  target?: number;
}) => {
  const difficulty = findDifficulty(target || DEFAULT_USER_GOAL);

  return await prisma.goal.create({
    data: {
      userId,
      target: target || DEFAULT_USER_GOAL,
      difficulty,
    },
  });
};

export const updateUserGoal: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("'id' does not exist in the query string", 400);

    const { target, earned, status } = request.body;
    if (!target && !earned && !status)
      throw new AppError(
        "Only 'target', 'earned' and 'status' can be updated",
        400
      );

    let newDifficulty = undefined;
    if (target) {
      newDifficulty = findDifficulty(target);
    }

    // NOTE: Updates can will only happen to ongoing goals
    const onGoingGoal = await prisma.goal.findFirst({
      where: {
        userId,
        status: "OnGoing",
      },
    });
    if (!onGoingGoal)
      throw new AppError(
        "There are currently no ongoing goals to update!",
        404
      );

    //2. If a goal exist, then we simply update the value
    const updatedGoal = await prisma.goal.update({
      where: {
        userId,
        id: onGoingGoal.id,
      },
      data: {
        target,
        earned,
        status,
        difficulty: newDifficulty,
      },
    });

    response.status(200).send({
      status: 200,
      data: updatedGoal,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getUserGoal: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("'id' does not exist in the query string", 400);

    const goalId = request.query.goalId as string | undefined;

    // Unless the user specifies a certain goalId then we'll simply get the most recent goal by the user.
    let userGoal = await prisma.goal.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,

        // If the user does not provide this field then it will be ignored.
        id: goalId,
      },
    });

    // Creates a new goal if the user has no goals yet (new accounts)
    if (!userGoal) {
      userGoal = await createGoal({ userId });
    }

    response.status(200).send({
      status: "success",
      data: userGoal,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserGoal: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("id was not provided in the query string!", 400);

    const target = request.body.target;
    if (!target)
      throw new AppError("'target' is not provided in the body!", 400);

    const newGoal = await createGoal({ userId, target });

    response.status(200).send({
      status: "success",
      data: newGoal,
    });
  } catch (error) {
    next(error);
  }
};

export const claimGoalReward: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string | undefined;
    if (!userId)
      throw new AppError("id was not provided in the query string", 404);

    // We are using a transaction to prevent race conditions.
    const updatedGoal = await prisma.$transaction(async (prisma) => {
      // Retrieve the goal with the unclaimed background
      const completedGoal = await prisma.goal.findFirst({
        where: {
          userId,
          status: "Completed",
          hasClaimedReward: false,
        },
      });
      if (!completedGoal) throw new AppError("Completed goal not found", 404);

      // Add the new reward background (if they exist, keep in mind if the user have collected all backgrounds this field will still become undefined)
      if (completedGoal?.backgroundRewardId) {
        await prisma.userBackground.create({
          data: {
            userId,
            backgroundId: completedGoal?.backgroundRewardId,
          },
        });
      }

      // Update the user goal data.
      return await prisma.goal.update({
        where: {
          id: completedGoal.id,
        },
        data: {
          hasClaimedReward: true,
        },
      });
    });

    response.status(200).send({
      status: "success",
      data: updatedGoal,
    });
  } catch (error) {
    next(error);
  }
};
