import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();

export const getBackgrounds: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    /*
    In later stages when we have alot of image this query will be paginated, but for now implementing it would be overkill. 
    */
    const allBackgrounds = await prisma.background.findMany({});
    if (!allBackgrounds) throw new AppError("No backgrounds found!", 404);

    response.status(200).send({
      status: "200",
      data: allBackgrounds,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBackground: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.params.id as string;
    if (!userId)
      throw new AppError("userId is not provided in the URL parameter", 400);

    const ownedBackgrounds = await prisma.userBackground.findMany({
      where: {
        userId,
      },
    });

    response.status(200).send({
      status: "success",
      data: ownedBackgrounds,
    });
  } catch (error) {
    next(error);
  }
};

export const setUserBackground: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError(
        "id (user id) was not provided in the query string",
        400
      );

    const backgroundId = request.body.backgroundId;
    if (!backgroundId)
      throw new AppError("'backgroundId' was not provded in the body", 400);

    // Check if the user has the background unlocked by querying the intermediary / junction table
    const userBackground = await prisma.userBackground.findFirst({
      where: {
        userId,
        backgroundId,
      },
    });
    if (!userBackground)
      throw new AppError("User does not have this background unlocked", 400);

    // If it does exist then query the background itself
    const background = await prisma.background.findUnique({
      where: {
        id: backgroundId,
      },
    });
    if (!background)
      throw new AppError(
        `The background with the if of ${backgroundId} does not exist, perhaps its has been deleted`,
        404
      );

    // Update the user data.
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        selectedBackgroundURL: background.URL,
      },
    });

    response.status(200).send({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
