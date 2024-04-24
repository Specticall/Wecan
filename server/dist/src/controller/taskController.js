"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedUserTask = exports.updateUserTask = exports.deleteUserTask = exports.addUserTask = exports.getUserTask = exports.generateAvailableTask = void 0;
const prisma_1 = require("../../prisma/prisma");
const AppError_1 = require("../utils/AppError");
const helper_1 = require("../utils/helper");
const library_1 = require("@prisma/client/runtime/library");
const DEFAULT_PAGINATION_SIZE = 5;
const generateAvailableTask = async (request, response, next) => {
    try {
        // Mood is an optional parameter
        const { mood, id: userId } = request.query;
        if (!userId)
            throw new AppError_1.AppError(`The required "id" field is missing`, 400);
        // 1. Retrieve task that is accepted by user and is still ongoing
        // This is done so that the randomizer won't take the same task that the user is currently doing.
        const userAcceptedTaskId = await prisma_1.prisma.task.findMany({
            where: {
                userId: userId,
                status: "OnGoing",
            },
            select: {
                id: true,
            },
        });
        // 2. Optionally filter for certain moods if the API user provided the required query string
        const queryOptions = {
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
            queryOptions.where.mood = mood;
        }
        // 3. Query the ids of task that are available to the user
        const taskPool = await prisma_1.prisma.availableTask.findMany({
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
        const targetId = taskPool.map((item) => item.id)[(0, helper_1.getRandomNumber)(0, taskPool.length - 1)];
        // 5. query the task created from the random number
        const generatedTask = await prisma_1.prisma.availableTask.findUnique({
            where: {
                id: targetId,
            },
        });
        if (!generatedTask)
            throw new AppError_1.AppError("Generated task was lost somewhere in the process", 500);
        response.status(200).send({
            status: "success",
            data: generatedTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateAvailableTask = generateAvailableTask;
const getUserTask = async (request, response, next) => {
    try {
        //1. Retrieve query data and userId
        const query = request.query;
        const userId = query.id;
        if (!userId)
            throw new AppError_1.AppError("`id` is missing from the URL query string", 400);
        //2. Retrieve goalId if it exist, this is used to get tasks from a specific goal period. Usually used when user's viewing history. We're using `let` here because if user does not specify the goal then we have to query the ongoing one from the database
        let goalId = query.goalId;
        //3. Checks for if the user is asking for a certain status and making sure the data passed in is correct.
        const status = query.status ? query.status : undefined;
        if (status && status !== "Completed" && status !== "OnGoing")
            throw new AppError_1.AppError("The query string `status` can only be `Completed` or 'OnGoing`", 400);
        //4. Checks for pagination query if they exist.
        const page = Number(query.page || "1");
        const size = query.size ? Number(query.size) : DEFAULT_PAGINATION_SIZE;
        //5. Check for time filter
        const timeSpan = query.date
            ? (0, helper_1.getTimeSpan)(new Date(query.data))
            : undefined;
        //5. If the user does not specify a specific goal then take the most recent goal
        const onGoingGoal = await prisma_1.prisma.goal.findFirst({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userId,
                createdAt: {
                    gte: timeSpan?.startOfDay || undefined,
                    lt: timeSpan?.endOfDay || undefined,
                },
            },
            select: {
                id: true,
            },
        });
        //6. Take the id field from the most recent goal
        goalId = onGoingGoal?.id;
        if (!goalId)
            throw new AppError_1.AppError("Failed to query goalId when retrieve tasks", 500);
        //7. Query the requested goal
        const userTask = await prisma_1.prisma.task.findMany({
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
        const totalTaskCount = await prisma_1.prisma.task.count({
            where: {
                userId,
                status,
                goalId,
                createdAt: {
                    gte: timeSpan?.startOfDay,
                    lt: timeSpan?.endOfDay,
                },
            },
        });
        response.status(200).send({
            status: "success",
            data: userTask,
            totalTaskCount,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserTask = getUserTask;
const addUserTask = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("`id` is missing from the URL query string", 400);
        const { description, points, title, status, mood } = request.body;
        if (!description || !points || !title || !status || !mood)
            throw new AppError_1.AppError("Either description, points, title, mood or status is missing from the request body task object!", 400);
        // Find onGoing goal
        const onGoingGoal = await prisma_1.prisma.goal.findFirst({
            where: {
                status: "OnGoing",
            },
        });
        if (!onGoingGoal)
            throw new AppError_1.AppError("There are currently no ongoing goals", 400);
        const newTask = await prisma_1.prisma.task.create({
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
            throw new AppError_1.AppError("Something went wrong while adding user task", 500);
        response.status(200).send({
            status: "success",
            data: newTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addUserTask = addUserTask;
const deleteUserTask = async (request, response, next) => {
    try {
        const taskId = request.query.taskId;
        if (!taskId)
            throw new AppError_1.AppError("`taskId` is missing from the request query", 400);
        await prisma_1.prisma.task.delete({
            where: {
                id: taskId,
            },
        });
        response.status(200).send({
            status: "success",
            data: "Successfully deleted",
        });
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            next(new AppError_1.AppError(`Task was not found`, 404));
            return;
        }
        next(error);
    }
};
exports.deleteUserTask = deleteUserTask;
const updateUserTask = async (request, response, next) => {
    try {
        const taskId = request.query.taskId;
        if (!taskId)
            throw new AppError_1.AppError("The request is missing 'taskId' in the query string", 400);
        const updatedUserTask = await prisma_1.prisma.task.update({
            where: {
                id: taskId,
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
            throw new AppError_1.AppError("Something went wrong while trying to update the user id", 404);
        response.status(200).send({
            status: "success",
            data: updatedUserTask,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserTask = updateUserTask;
const completedUserTask = async (request, response, next) => {
    try {
        const taskId = request.query.taskId;
        const userId = request.query.userId;
        if (!taskId || !userId)
            throw new AppError_1.AppError("The request is missing 'taskId' or 'userId' in the query string", 400);
        // Make sure the task was not previously completed
        const Status = await prisma_1.prisma.task.findUnique({
            where: {
                id: taskId,
            },
            select: {
                status: true,
            },
        });
        if (Status?.status === "Completed")
            throw new AppError_1.AppError("Task is already completed", 400);
        // Update the task document status to complete and at completion date
        const updatedTask = await prisma_1.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status: "Completed",
                completedAt: new Date(),
            },
        });
        if (!updatedTask)
            throw new AppError_1.AppError("Something went wrong while trying to update the task", 500);
        // Find the the user's current ongoing task
        const onGoingGoals = await prisma_1.prisma.goal.findFirst({
            where: {
                status: "OnGoing",
                userId,
            },
        });
        if (!onGoingGoals)
            throw new AppError_1.AppError("There are not on going goals right now!", 404);
        // Update the user's point value on their goal and history instances
        const pointsEarned = updatedTask.points;
        // Calculates the new total completion rate percent
        const newCompletionPercent = (0, helper_1.calcPercentage)(onGoingGoals.earned, onGoingGoals.target);
        // Calculates the completion rated earned from this task (will be incremented wih the history's current completionPercent)
        const completionPercentEarned = (0, helper_1.calcPercentage)(pointsEarned, onGoingGoals.target);
        const updatedUserGoal = await prisma_1.prisma.goal.update({
            where: {
                id: onGoingGoals.id,
            },
            data: {
                earned: {
                    increment: pointsEarned,
                },
                taskCompleted: {
                    increment: 1,
                },
                completionPercent: newCompletionPercent,
                // Set the status to completed if the user has filled the required points.
                status: onGoingGoals.earned >= onGoingGoals.target ? "Completed" : "OnGoing",
            },
        });
        /*
        Retrieves the current on going history since we can't do a db transaction using the goal id and status
        */
        const onGoingHistory = await prisma_1.prisma.history.findFirst({
            where: {
                goalId: onGoingGoals.id,
                status: "OnGoing",
            },
        });
        if (!onGoingHistory)
            throw new AppError_1.AppError("There are on going history right now", 404);
        // Update the current ongoing history
        await prisma_1.prisma.history.update({
            where: {
                id: onGoingHistory.id,
            },
            data: {
                pointsEarned: {
                    increment: pointsEarned,
                },
                taskCompleted: {
                    increment: 1,
                },
                completionPercent: {
                    increment: completionPercentEarned,
                },
            },
        });
        if (!updatedUserGoal)
            throw new AppError_1.AppError("Something went wrong while trying to update the user data", 500);
        response.status(200).send({
            status: "success",
            data: updatedUserGoal,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.completedUserTask = completedUserTask;
//# sourceMappingURL=taskController.js.map