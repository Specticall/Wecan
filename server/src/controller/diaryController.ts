import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { getPointsByMood } from "../model/pointsDataReference";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();

export const getUserDiaries: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // 1. Retrieve the user id from the user body
    const { id: userId } = request.query;
    if (!userId)
      throw new Error("This request is missing `userId` in the parameter");

    // 2. Retrieve the user diaries
    const userDiaries = await prisma.diary.findMany({
      where: {
        authorId: userId as string,
      },
    });

    response.status(200).send({
      data: userDiaries,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const createUserDiary: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // 1. Retrieve data from the body
    const { content, mood, id: userId } = request.body;
    if (!content || !mood || !userId)
      throw new AppError(
        "Either content, mood or userId are missing in the request body",
        400
      );

    // 1.5 Typecheck the incoming mood value
    const containsValidMoodValue = [
      "Ecstatic",
      "Happy",
      "Sad",
      "Depressed",
      "Neutral",
    ].some((moodItem) => mood === moodItem);

    if (!containsValidMoodValue) {
      throw new AppError(
        '"mood" must have the following values: "Ecstatic", "Happy", "Sad", "Depressed", "Neutral"',
        401
      );
    }

    // 2. Determine the task points needed
    const generatedTargetPoints = getPointsByMood(mood);

    // 3. Create the document using prisma
    const newDiary = await prisma.diary.create({
      data: {
        content,
        mood,
        earnedPoints: 0,
        targetPoints: generatedTargetPoints,
        authorId: userId,
      },
    });
    if (!newDiary)
      throw new AppError(
        "Something wen't wrong while trying to create the diary",
        500
      );

    // 4. Update the user's `hasCreatedDiaryToday` and `Point` field
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasCreatedDiaryToday: true,
        mood: mood,
        point: {
          update: {
            earnedToday: 0,
            targetToday: generatedTargetPoints,
          },
        },
      },
    });

    // 4. Send back the newly created Diary object to the client
    response.status(200).send({
      data: newDiary,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
