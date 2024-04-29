import { Goal, PrismaClient, User } from "@prisma/client";
import { isToday } from "../utils/helper";
import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { PrismaTransactionalClient } from "../utils/types";

const prisma = new PrismaClient();

/**
 * Checks if the current on going history is not made today (outdated)
 * This function does 3 main things, checking for outdated histories, invalidating them and creating a new one.
 * Mainly used together with `refreshUser()` on userController.ts
 */
export const refreshUserHistory = async (onGoingGoal: Goal, userData: User) => {
  const mostRecentHistory = await prisma.history.findFirst({
    orderBy: {
      date: "desc",
    },
    where: {
      goalId: onGoingGoal.id,
    },
  });

  // If a history does not exist or is outdated (not made today) then create a new one
  const historyIsOutdated =
    mostRecentHistory && !isToday(mostRecentHistory.date);

  // If a history is outdated then mark it as "completed" (because we're going to create a new one)
  if (historyIsOutdated) {
    await prisma.history.update({
      where: {
        id: mostRecentHistory.id,
      },
      data: {
        status: "Completed",
      },
    });
  }

  // Create a new history if the history is outdated / does not exist.
  if (!mostRecentHistory || historyIsOutdated) {
    await prisma.history.create({
      data: {
        date: new Date(),
        goalId: onGoingGoal.id,
        mood: userData.mood,
        pointsEarned: 0,
        taskCompleted: 0,
      },
    });
  }
};

/**
 * Changes an ongoing user history status to completed. This function is used after a user completes a goal. Without this then there will be duplicate onGoing history the next time the user creates a new goal
 * @param onGoingGoal
 * @param transaction is used when the function is a part of a transaction. We pass in the `prisma` insteance from the `$transaction` function
 */
export const completeUserHistory = async (
  onGoingGoal: Goal,
  transaction: PrismaTransactionalClient = prisma
) => {
  const onGoingHistory = await transaction.history.findFirst({
    where: {
      goalId: onGoingGoal.id,
      status: "OnGoing",
    },
  });
  if (!onGoingHistory)
    throw new AppError(
      "on going history does not exist whilst trying to complete a history",
      404
    );
  await transaction.history.update({
    where: {
      id: onGoingHistory?.id,
    },
    data: {
      status: "Completed",
    },
  });
};

export const getHistory: RequestHandler = async (request, response, next) => {
  try {
    const query = request.query;
    const userId = query.id as string;
    if (!userId) throw new AppError("Missing `id` query in the request", 400);

    // TBA -> Accepts a goal query so user can retrieve specific data from certain goals.

    // Handles ranged base history retrieval. User can specify a specific time range of the data. For example from 15th to 20th December 2023 will be represented as startDate=00000&&startDate=000000 (the 0s will be a timestamp)
    // Mainly used for charts
    if (query.startDate && query.endDate) {
      const startDateTimestamp = Number(query.startDate);
      const endDateTimestamp = Number(query.endDate);
      if (!startDateTimestamp || !endDateTimestamp)
        throw new AppError("Incomplete start or end date timestamp", 400);

      const mostRecentGoal = await prisma.goal.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
      });

      const histories = await prisma.history.findMany({
        where: {
          /**
           * Make sure to only grab data from the latest goal doesn't matter whether it is completed or not.
           */
          goalId: mostRecentGoal?.id,
          goal: {
            userId,
          },
          date: {
            gte: new Date(startDateTimestamp),
            lte: new Date(endDateTimestamp),
          },
        },
      });

      response.status(200).send({
        status: "success",
        data: histories,
      });

      return;
    }

    // If the user does provide a goal id to the query then we can just retrieve the current ongoing goal's ongoing history (kind of confusing, I know).
    const onGoingHistory = await prisma.history.findFirst({
      where: {
        goal: {
          userId,
        },
        status: "OnGoing",
      },
    });

    // If no ongoing history is found the this means the user has already completed the current goal. The application is basically waiting for them to claim the reward and start a new goal.
    let latestGoal = undefined;
    if (!onGoingHistory) {
      latestGoal = await prisma.history.findFirst({
        orderBy: {
          date: "desc",
        },
        where: {
          goal: {
            userId,
          },
        },
      });
    }

    response.status(200).send({
      status: "success",
      data: onGoingHistory || latestGoal,
    });
  } catch (error) {
    next(error);
  }
};
