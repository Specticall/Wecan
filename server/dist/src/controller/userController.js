"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserMood = exports.getUser = exports.refreshUserData = void 0;
const helper_1 = require("../utils/helper");
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
const historyController_1 = require("./historyController");
const prisma = new client_1.PrismaClient();
/**
 *  Updates user's daily data based on the last login date.
 *  If the last login date is not today, it resets the `hasCreatedDiaryToday` field to false and some other fields on the `Point` document
 *
 * NOTE : If this is the first time a user's logging in today that means a dialog will show up prompting the user to enter a mood. Once this dialog gets closed that's when the last login date field is updated. This is to ensure the frontend knows that is should be showing a popup due to the last login's value.
 */
const refreshUserData = async (userData) => {
    // Check if the last time user logged is today or not, if not then the diary should be renewed
    // const isANewDay = !isToday(userData.lastLogin);
    // Checks if there are  any ongoing goals
    const onGoingGoal = await prisma.goal.findFirst({
        where: {
            userId: userData.id,
            status: "OnGoing",
        },
    });
    // Checks if user should keep diary streak or not by quering the most recent diary checking its createion date
    const mostRecentDiary = await prisma.diary.findFirst({
        orderBy: {
            dateCreated: "desc",
        },
        where: {
            authorId: userData.id,
        },
    });
    // If the user last login date was not today then refresh the mood.
    const shouldResetMood = !(0, helper_1.isToday)(userData.lastLogin);
    // If a diary was made either today or yesterday then the user should keep their diary streak
    const shouldKeepDiaryStreak = mostRecentDiary &&
        ((0, helper_1.isYesterday)(mostRecentDiary.dateCreated) ||
            (0, helper_1.isToday)(mostRecentDiary.dateCreated));
    // Update User Data
    const updatedUser = await prisma.user.update({
        where: {
            id: userData.id,
        },
        data: {
            // Checks for any expired task
            hasOnGoingGoal: Boolean(onGoingGoal),
            // Undefined means that this change will be ignored. So we're essentially keeping the data.
            diaryStreak: shouldKeepDiaryStreak ? undefined : 0,
            hasSetMoodToday: shouldResetMood ? false : undefined,
            mood: shouldResetMood ? "Unknown" : undefined,
            lastLogin: new Date(),
        },
        // include: {
        //   point: true,
        // },
    });
    // Check the most recent history creation date, if it is not made from today that means the user last logged a while ago so we need to create a new instance. This action will only happen if an ongoing goal exists.
    if (!onGoingGoal)
        return updatedUser;
    await (0, historyController_1.refreshUserHistory)(onGoingGoal, userData);
    return updatedUser;
};
exports.refreshUserData = refreshUserData;
const getUser = async (request, response, next) => {
    try {
        // 1. Retrieve the data from URL query string
        const queries = request.query;
        const userId = queries.id;
        if (!userId)
            throw new AppError_1.AppError("User id was not provided in the `id` params!", 400);
        /*
        With prisma, the query chaining method used in mongoose unfortunately does not work. The approach recommended by the maintainers of prisma is to create a query option object that builds on the user inputted request queries.
        */
        const queryOption = {
            where: {
                id: userId,
            },
        };
        //2. Check for `field limiting` queries
        if (queries.fields) {
            const selectedFields = queries.fields.split(" ");
            queryOption.select = (0, helper_1.buildPrismaSelectQueryObject)(selectedFields);
        }
        // 3. Retrieve user from the database
        const userData = await prisma.user.findUnique(queryOption);
        if (!userData)
            throw new AppError_1.AppError(`User data with the id of ${userId} was not found!`, 404);
        // 4. Sync and update the user data in respect to the current time IF the user does not provide any query other than the id
        const shouldRefreshUserData = Object.keys(queries).every((item) => item === "id");
        // A refresh will happen frequently to make sure a user data is not outsynced with the date.
        const refreshedUserData = shouldRefreshUserData
            ? await (0, exports.refreshUserData)(userData)
            : userData;
        if (!refreshedUserData)
            throw new AppError_1.AppError("Something went wrong while trying to refresh the user data", 500);
        //4. Send back the user data
        response.status(200).send({
            status: "success",
            data: refreshedUserData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const getUserMood = async (request, response, next) => {
    try {
        const { id: userId } = request.query;
        if (!userId)
            throw new AppError_1.AppError("`id` was not provided in the request query string!", 400);
        const userMood = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                mood: true,
            },
        });
        if (!userMood)
            throw new AppError_1.AppError("Something went wrong while trying to find the user's mood", 500);
        response.status(200).send({
            status: "success",
            data: userMood,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserMood = getUserMood;
const updateUser = async (request, response, next) => {
    try {
        // 1. Retrieve the data from URL query string
        const queries = request.query;
        const updatedData = request.body;
        const userId = queries.id;
        if (!userId)
            throw new AppError_1.AppError("User id was not provided in the `id` params!", 400);
        // 3. Retrieve user from the database
        const updatedUserData = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updatedData,
        });
        if (!updatedUserData)
            throw new AppError_1.AppError(`User data with the id of ${userId} was not found!`, 404);
        //4. Send back the user data
        response.status(200).send({
            status: "success",
            data: updatedUserData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map