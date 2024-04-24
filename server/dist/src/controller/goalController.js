"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserGoal = exports.updateUserGoal = void 0;
const AppError_1 = require("../utils/AppError");
const prisma_1 = require("../../prisma/prisma");
const DEFAULT_USER_GOAL = 150000;
const updateUserGoal = async (request, response, next) => {
    try {
        const userId = request.query.id;
        if (!userId)
            throw new AppError_1.AppError("'id' does not exist in the query string", 400);
        const { target, earned, status } = request.body;
        if (!target && !earned && !status)
            throw new AppError_1.AppError("Only 'target', 'earned' and 'status' can be updated", 400);
        //2. If a goal exist, then we simply update the value
        const updatedGoal = await prisma_1.prisma.goal.update({
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
            userGoal = await prisma_1.prisma.goal.create({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getUserGoal = getUserGoal;
//# sourceMappingURL=goalController.js.map