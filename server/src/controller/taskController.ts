import { RequestHandler } from "express";
import { prisma } from "../../prisma/prisma";
import { Mood, Prisma, TaskStatus } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { getRandomNumber } from "../utils/helper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
        NOT: [
          {
            // The `userAcceptedTaskId` query returns an object array `{id: string}[]` so we need to convert it into `string[]`
            id: {
              in: userAcceptedTaskId.map((item) => item.id),
            },
          },
        ],
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

export const getUserTask: RequestHandler = async (request, response, next) => {
  try {
    const query = request.query;
    const userId = query.id as string;
    if (!userId)
      throw new AppError("`id` is missing from the URL query string", 400);

    const status = query.status as TaskStatus;
    if (status && status !== "Completed" && status !== "OnGoing")
      throw new AppError(
        "The query string `status` can only be `Completed` or 'OnGoing`",
        400
      );

    const userTask = await prisma.task.findMany({
      where: {
        userId,
        // Only apply the status query if if exists.
        ...(status ? { status } : {}),
      },
    });

    response.status(200).send({
      status: "success",
      data: userTask,
    });
  } catch (error) {
    next(error);
  }
};

export const addUserTask: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("`id` is missing from the URL query string", 400);

    const { description, points, title, status, mood } = request.body;

    if (!description || !points || !title || !status || !mood)
      throw new AppError(
        "Either description, points, title, mood or status is missing from the request body task object!",
        400
      );

    const newTask = await prisma.task.create({
      data: {
        description,
        points,
        title,
        status,
        userId,
        mood,
      },
    });
    if (!newTask)
      throw new AppError("Something went wrong while adding user task", 500);

    response.status(200).send({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserTask: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const taskId = request.query.taskId as string;
    if (!taskId)
      throw new AppError("`taskId` is missing from the request query", 400);

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    response.status(200).send({
      status: "success",
      data: "Successfully deleted",
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      next(new AppError(`Task was not found`, 404));
      return;
    }

    next(error);
  }
};

export const updateUserTask: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const taskId = request.query.taskId as string;
    if (!taskId)
      throw new AppError(
        "The request is missing 'taskId' in the query string",
        400
      );

    const updatedUserTask = await prisma.task.update({
      where: {
        id: taskId as string,
      },
      // If they don't exist (undefined) the query will be ignored
      data: {
        description: request.body.description,
        mood: request.body.mood,
        points: request.body.points,
        status: request.body.status,
        title: request.body.title,
      },
    });
    if (!updatedUserTask)
      throw new AppError(
        "Something went wrong while trying to update the user id",
        500
      );

    response.status(200).send({
      status: "success",
      data: updatedUserTask,
    });
  } catch (error) {
    next(error);
  }
};

export const completedUserTask: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const taskId = request.query.taskId as string;
    const userId = request.query.userId as string;
    if (!taskId || !userId)
      throw new AppError(
        "The request is missing 'taskId' or 'userId' in the query string",
        400
      );

    // Make sure the task was not previously completed
    const taskStatus = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        status: true,
      },
    });
    if (taskStatus?.status === "Completed")
      throw new AppError("Task is already completed", 400);

    // Update the task document
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: "Completed",
      },
    });
    if (!updatedTask)
      throw new AppError(
        "Something went wrong while trying to update the task",
        500
      );

    // Update the user's point value
    const updatedUserPoints = await prisma.point.update({
      where: {
        userId,
      },
      data: {
        earnedToday: {
          increment: updatedTask.points,
        },
        earnedOverall: {
          increment: updatedTask.points,
        },
      },
    });
    if (!updatedUserPoints)
      throw new AppError(
        "Something went wrong while trying to update the user data",
        500
      );

    response.status(200).send({
      status: "success",
      data: updatedUserPoints,
    });
  } catch (error) {
    next(error);
  }
};
