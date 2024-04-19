import { RequestHandler } from "express";
import { prisma } from "../../prisma/prisma";
import { Mood, Prisma, Status } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { getRandomNumber } from "../utils/helper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const DEFAULT_PAGINATION_SIZE = 5;

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
      // NOTE : Not sure why TS thinks `queryOptions.where` can become undefined when it is clearly declared at the top
      queryOptions.where!.mood = mood as Mood;
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
    //1. Retrieve query data and userId
    const query = request.query;
    const userId = query.id as string;
    if (!userId)
      throw new AppError("`id` is missing from the URL query string", 400);

    //2. Retrieve goalId if it exist, this is used to get tasks from a specific goal period. Usually used when user's viewing history. We're using `let` here because if user does not specify the goal then we have to query the ongoing one from the database
    let goalId = query.goalId as string | undefined;

    //3. Checks for if the user is asking for a certain status and making sure the data passed in is correct.
    const status = query.status ? (query.status as Status) : undefined;
    if (status && status !== "Completed" && status !== "OnGoing")
      throw new AppError(
        "The query string `status` can only be `Completed` or 'OnGoing`",
        400
      );

    //4. Checks for pagination query if they exist.
    const page = Number(query.page || "1");
    const size = query.size ? Number(query.size) : DEFAULT_PAGINATION_SIZE;

    //5. If the user does not specify a specific goal then take the current ongoing goal.
    const onGoingGoal = await prisma.goal.findFirst({
      where: {
        status: "OnGoing",
      },
      select: {
        id: true,
      },
    });

    //6. Take the id field from the current ongoing goal.
    goalId = onGoingGoal?.id;
    if (!goalId)
      throw new AppError("Failed to query goalId when retrieve tasks", 500);

    //7. Query the requested goal
    const userTask = await prisma.task.findMany({
      where: {
        userId,
        status,
        goalId,
      },
      skip: query.page ? (page - 1) * size : undefined,
      take: query.page ? size : undefined,

      // Latest comes first
      orderBy: {
        createdAt: "desc",
      },
    });

    // 8. Retrieves the current task count (usually used for pagination purposes).
    const totalTaskCount = await prisma.task.count({
      where: {
        userId,
        status,
        goalId,
      },
    });

    response.status(200).send({
      status: "success",
      data: userTask,
      totalTaskCount,
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

    // Find onGoing goal
    const onGoingGoal = await prisma.goal.findFirst({
      where: {
        status: "OnGoing",
      },
    });

    if (!onGoingGoal)
      throw new AppError("There are currently no ongoing goals", 400);

    const newTask = await prisma.task.create({
      data: {
        description,
        points,
        title,
        status,
        userId,
        mood,
        goalId: onGoingGoal.id,
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
        404
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
    const Status = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        status: true,
      },
    });
    if (Status?.status === "Completed")
      throw new AppError("Task is already completed", 400);

    // Update the task document
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: "Completed",
        completedAt: new Date(),
      },
    });
    if (!updatedTask)
      throw new AppError(
        "Something went wrong while trying to update the task",
        500
      );

    // Find the the user's current ongoing task
    const onGoingGoals = await prisma.goal.findFirst({
      where: {
        status: "OnGoing",
        userId,
      },
    });
    if (!onGoingGoals)
      throw new AppError("There are not on going goals right now!", 404);

    // Update the user's point value
    const updatedUserGoal = await prisma.goal.update({
      where: {
        id: onGoingGoals.id,
      },
      data: {
        earned: {
          increment: updatedTask.points,
        },
      },
    });
    if (!updatedUserGoal)
      throw new AppError(
        "Something went wrong while trying to update the user data",
        500
      );

    response.status(200).send({
      status: "success",
      data: updatedUserGoal,
    });
  } catch (error) {
    next(error);
  }
};
