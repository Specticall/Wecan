import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../../prisma/prisma";

export const updateUserGoal: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("'id' does not exist in the query string", 400);

    const { target, earned, status } = request.body;
    if (!target && !earned && !status)
      throw new AppError(
        "Only 'target', 'earned' and 'status' can be updated",
        400
      );

    //2. If a goal exist, then we simply update the value
    const updatedGoal = await prisma.goal.update({
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
  } catch (error) {
    next(error);
  }
};

export const getUserGoal: RequestHandler = async (request, response, next) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("'id' does not exist in the query string", 400);

    /*
    Each user can only have one ongoing goal, as such when a request hits this endpoint it will automatically create a new ongoing goal document if none are. 
    */
    let userGoal = await prisma.goal.findUnique({
      where: {
        userId,
        status: "OnGoing",
      },
    });

    if (!userGoal) {
      userGoal = await prisma.goal.create({
        data: {
          userId,
          // NOTE : Altough 'target', 'earned' and 'status' can technically be updated, if we're following the planned usage of this endpoint then a create operation will only be done on the onboarding route which userId are supplied and status will default to onGoing (already defined in the schema)
        },
      });
    }

    response.status(200).send({
      status: "success",
      data: userGoal,
    });
  } catch (error) {
    next(error);
  }
};
