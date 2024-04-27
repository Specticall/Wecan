import { Difficulty, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { getRandomNumber } from "../utils/helper";

const prisma = new PrismaClient();

const getTier = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
  }
};

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

export const getBackgroundReward = async (
  userId: string,
  difficulty: Difficulty
) => {
  // 1. Retrieve the user owned backgrounds
  const ownedBackgrounds = await prisma.userBackground.findMany({
    where: {
      userId,
    },
  });

  // 2. Get an array of the user owned backgrounds. (to make sure there will be no repeats)
  const ownedBackgroundIds = ownedBackgrounds.map(
    (owned) => owned.backgroundId
  );

  // 3. Retrieve all the available background with the specified difficulty into an array
  const availableBackground = await prisma.background.findMany({
    where: {
      tier: getTier(difficulty),
      // Make sure to not pull user owned backgrounds
      id: {
        notIn: ownedBackgroundIds,
      },
    },
  });

  // 3.5 If there are no longer available backgrounds then return an empty array.
  if (availableBackground.length <= 0) {
    return undefined;
  }

  // 4. Get a random number ranging from 0 to the array's length - 1
  const randomNumber = getRandomNumber(0, availableBackground.length - 1);

  // 5. Use the random number to retrieve a background.
  return availableBackground[randomNumber];
};
