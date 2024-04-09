import { RequestHandler } from "express";
import { prisma } from "../../prisma/prisma";
import { Mood, Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { getRandomNumber } from "../utils/helper";

export const generateAvailableTask: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // Mood is an optional parameter
    const { mood, id: userId } = request.query;
    if (!userId) throw new AppError(`The required "id" field is missing`, 400);

    // 1. Retrieve task that is accepted by user and is still ongoing
    // This is done so that the randomizer won't take the same task that the user is currently doing.
    const userAcceptedTaskId = await prisma.task.findMany({
      where: {
        userId: userId as string,
        status: "OnGoing",
      },
      select: {
        id: true,
      },
    });

    // 2. Optionally filter for certain moods if the API user provided the required query string
    const queryOptions: Prisma.AvailableTaskFindManyArgs = {
      where: {
        id: {
          // The `userAcceptedTaskId` query returns an object array `{id: string}[]` so we need to convert it into `string[]`
          notIn: userAcceptedTaskId.map((item) => item.id),
        },
      },
    };

    if (mood) {
      queryOptions.where = { mood: mood as Mood };
    }

    // 3. Query the ids of task that are available to the user
    const taskPool = await prisma.availableTask.findMany({
      ...queryOptions,
      select: { id: true },
    });

    // Since an empty task pool is not really an error, we should not throw but instead send an empty array as a repsonse.
    if (taskPool.length === 0)
      return response.status(200).send({
        status: "success",
        data: [],
      });

    // 4. Randomly pick an id from the task pool
    const targetId = taskPool.map((item) => item.id)[
      getRandomNumber(0, taskPool.length - 1)
    ];

    // 5. query the task created from the random number
    const generatedTask = await prisma.availableTask.findUnique({
      where: {
        id: targetId,
      },
    });
    if (!generatedTask)
      throw new AppError(
        "Generated task was lost somewhere in the process",
        500
      );

    response.status(200).send({
      status: "success",
      data: generatedTask,
    });
  } catch (error) {
    next(error);
  }
};
