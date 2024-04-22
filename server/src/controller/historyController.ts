import { Goal, PrismaClient, User } from "@prisma/client";
import { isToday } from "../utils/helper";
import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";

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

export const getHistory: RequestHandler = async (request, response, next) => {
  try {
    const query = request.query;
    const userId = query.id as string;
    if (!userId) throw new AppError("Missing `id` query in the request", 400);

    // TBA -> Accepts a goal query so user can retrieve specific data from certain goals.

    // TBA -> Accepts a start and end date so the API user can retrieve history from specific ranges of time (used for chart)

    // If the user does provide any goal id to the query then we can just retrieve the current ongoing goal's ongoing history (kind of confusing, I know).
    const onGoingHistory = await prisma.history.findFirst({
      where: {
        goal: {
          userId,
        },
        status: "OnGoing",
      },
    });

    if (!onGoingHistory) throw new AppError("No On Going History Found", 404);

    response.status(200).send({
      status: "success",
      data: onGoingHistory,
    });
  } catch (error) {
    next(error);
  }
};
