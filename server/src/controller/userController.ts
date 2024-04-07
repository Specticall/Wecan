import { RequestHandler } from "express";
import { isToday } from "../utils/helper";
import { PrismaClient, User } from "@prisma/client";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();

/**
 *  Updates user's daily data based on the last login date.
 *  If the last login date is not today, it resets the `hasCreatedDiaryToday` field to false and some other fields on the `Point` document
 */
export const refreshUserData = async (userData: User) => {
  // Check if the last time user logged is today or not, if not then the diary should be renewed
  const isANewDay = !isToday(userData.lastLogin);

  const updatedUser = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      lastLogin: new Date(),

      // Reset the diary and point data if its a new day.
      hasCreatedDiaryToday: isANewDay ? false : userData.hasCreatedDiaryToday,
      point: {
        update: isANewDay
          ? {
              earnedToday: 0,
              targetToday: 0,
            }
          : {},
      },
    },
    include: {
      point: true,
    },
  });

  return updatedUser;
};

export const getUser: RequestHandler = async (request, response, next) => {
  try {
    // 1. Retrieve the id from URL query string
    const { id: userId } = request.query;
    if (!userId)
      throw new AppError("User id was not provided in the `id` params!", 400);

    // 2. Retrieve user from the database
    const userData = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });
    if (!userData)
      throw new AppError(
        `User data with the id of ${userId} was not found!`,
        404
      );

    // 3. Sync and update the user data in respect to the current time
    const refreshedUserData = await refreshUserData(userData);
    if (!refreshUserData)
      throw new AppError(
        "Something went wrong while trying to refresh the user data",
        500
      );

    //4. Send back the user data
    response.status(200).send({
      status: "success",
      data: refreshedUserData,
    });

    // const userData = await prisma.get()
  } catch (error) {
    next(error);
  }
};
