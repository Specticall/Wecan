import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../../prisma/prisma";

const DEFAULT_USER_GOAL = 150_000;

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

    //2. If a goal exist, then we simply update the value
    const updatedGoal = await prisma.goal.update({
      where: {
        userId,
      },
      data: {
        target,
        earned,
        status,
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
      userGoal = await prisma.goal.create({
        data: {
          userId,
          target: DEFAULT_USER_GOAL,
          // NOTE : Altough 'target', 'earned' and 'status' can technically be updated, if we're following the planned usage of this endpoint then a create operation will only be done on the onboarding route which userId are supplied and status will default to onGoing (already defined in the schema)
        },
      });
    }

    response.status(200).send({
      status: "success",
      data: userGoal,
    });
  } catch (error) {
    next(error);
  }
};
