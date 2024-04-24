"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.refreshUserHistory = void 0;
const client_1 = require("@prisma/client");
const helper_1 = require("../utils/helper");
const AppError_1 = require("../utils/AppError");
const prisma = new client_1.PrismaClient();
/**
 * Checks if the current on going history is not made today (outdated)
 * This function does 3 main things, checking for outdated histories, invalidating them and creating a new one.
 * Mainly used together with `refreshUser()` on userController.ts
 */
const refreshUserHistory = async (onGoingGoal, userData) => {
    const mostRecentHistory = await prisma.history.findFirst({
        orderBy: {
            date: "desc",
        },
        where: {
            goalId: onGoingGoal.id,
        },
    });
    // If a history does not exist or is outdated (not made today) then create a new one
    const historyIsOutdated = mostRecentHistory && !(0, helper_1.isToday)(mostRecentHistory.date);
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
exports.refreshUserHistory = refreshUserHistory;
const getHistory = async (request, response, next) => {
    try {
        const query = request.query;
        const userId = query.id;
        if (!userId)
            throw new AppError_1.AppError("Missing `id` query in the request", 400);
        // TBA -> Accepts a goal query so user can retrieve specific data from certain goals.
        // Handles ranged base history retrieval. User can specify a specific time range of the data. For example from 15th to 20th December 2023 will be represented as startDate=00000&&startDate=000000 (the 0s will be a timestamp)
        // Mainly used for charts
        if (query.startDate && query.endDate) {
            const startDateTimestamp = Number(query.startDate);
            const endDateTimestamp = Number(query.endDate);
            if (!startDateTimestamp || !endDateTimestamp)
                throw new AppError_1.AppError("Incomplete start or end date timestamp", 400);
            const histories = await prisma.history.findMany({
                where: {
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
        // If the user does provide any goal id to the query then we can just retrieve the current ongoing goal's ongoing history (kind of confusing, I know).
        const onGoingHistory = await prisma.history.findFirst({
            where: {
                goal: {
                    userId,
                },
                status: "OnGoing",
            },
        });
        if (!onGoingHistory)
            throw new AppError_1.AppError("No On Going History Found", 404);
        response.status(200).send({
            status: "success",
            data: onGoingHistory,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getHistory = getHistory;
//# sourceMappingURL=historyController.js.map