"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserGoals = exports.claimGoalReward = exports.createUserGoal = exports.getUserGoal = exports.updateUserGoal = exports.createGoal = void 0;
const AppError_1 = require("../utils/AppError");
const prisma_1 = require("../../prisma/prisma");
const DEFAULT_USER_GOAL = 150000;
const difficultyRange = [
    { difficulty: "Easy", min: 50000, max: 150000 },
    { difficulty: "Medium", min: 200000, max: 350000 },
    { difficulty: "Hard", min: 40000, max: 500000 },
];
const findDifficulty = (point) => {
    const range = difficultyRange.find((range) => range.min <= point && point <= range.max);
    if (!range)
        throw new Error(`No difficulty from ${point} points was found`);
    return range.difficulty;
};
const createGoal = async ({ userId, target, }) => {
    const difficulty = findDifficulty(target || DEFAULT_USER_GOAL);
    return await prisma_1.prisma.goal.create({
        data: {
            userId,
            target: target || DEFAULT_USER_GOAL,
            difficulty,
        },
    });
};
exports.createGoal = createGoal;
const updateUserGoal = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("'id' does not exist in the query string", 400);
        const { target, earned, status } = request.body;
        if (!target && !earned && !status)
            throw new AppError_1.AppError("Only 'target', 'earned' and 'status' can be updated", 400);
        let newDifficulty = undefined;
        if (target) {
            newDifficulty = findDifficulty(target);
        }
        // NOTE: Updates can will only happen to ongoing goals
        const onGoingGoal = await prisma_1.prisma.goal.findFirst({
            where: {
                userId,
                status: "OnGoing",
            },
        });
        if (!onGoingGoal)
            throw new AppError_1.AppError("There are currently no ongoing goals to update!", 404);
        //2. If a goal exist, then we simply update the value
        const updatedGoal = await prisma_1.prisma.goal.update({
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserGoal = updateUserGoal;
const getUserGoal = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("'id' does not exist in the query string", 400);
        const goalId = request.query.goalId;
        // Unless the user specifies a certain goalId then we'll simply get the most recent goal by the user.
        let userGoal = await prisma_1.prisma.goal.findFirst({
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
            userGoal = await (0, exports.createGoal)({ userId });
        }
        response.status(200).send({
            status: "success",
            data: userGoal,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserGoal = getUserGoal;
const createUserGoal = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("id was not provided in the query string!", 400);
        const target = request.body.target;
        if (!target)
            throw new AppError_1.AppError("'target' is not provided in the body!", 400);
        const newGoal = await prisma_1.prisma.$transaction(async (prisma) => {
            const onGoingGoal = await prisma.goal.findFirst({
                where: {
                    userId,
                    status: "OnGoing",
                },
            });
            if (onGoingGoal)
                throw new AppError_1.AppError("There is still an ongoing goal", 400);
            // Create a new goal
            const newGoal = await (0, exports.createGoal)({ userId, target });
            const userData = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!userData)
                throw new AppError_1.AppError("User does not exist", 400);
            // Complete the current ongoing history  an create a new on based on the newly created goal.
            await prisma.history.create({
                data: {
                    date: new Date(),
                    goalId: newGoal.id,
                    mood: userData.mood,
                    pointsEarned: 0,
                    taskCompleted: 0,
                },
            });
            return newGoal;
        });
        response.status(201).send({
            status: "success",
            data: newGoal,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUserGoal = createUserGoal;
const claimGoalReward = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("id was not provided in the query string", 404);
        // We are using a transaction to prevent race conditions.
        const updatedGoal = await prisma_1.prisma.$transaction(async (prisma) => {
            // Retrieve the goal with the unclaimed background
            const completedGoal = await prisma.goal.findFirst({
                where: {
                    userId,
                    status: "Completed",
                    hasClaimedReward: false,
                },
            });
            if (!completedGoal)
                throw new AppError_1.AppError("Completed goal not found", 404);
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
    }
    catch (error) {
        next(error);
    }
};
exports.claimGoalReward = claimGoalReward;
const getAllUserGoals = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("id was not provided in the query string", 400);
        const allGoals = await prisma_1.prisma.goal.findMany({
            where: {
                userId,
            },
        });
        response.status(200).send({
            status: "success",
            data: allGoals,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUserGoals = getAllUserGoals;
//# sourceMappingURL=goalController.js.map