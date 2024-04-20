import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { isYesterday } from "../utils/helper";

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
    const { content, id: userId } = request.body;
    if (!content || !userId)
      throw new AppError(
        "Either content or userId are missing in the request body",
        400
      );

    // 2. We need to check whether the user is currently on a streak. To do that we get the most recent diary created.
    // Note: if this is the user's first diary then this whole process should be ignored.
    const mostRecentDiary = await prisma.diary.findFirst({
      orderBy: {
        dateCreated: "desc",
      },
      where: {
        authorId: userId,
      },
    });

    // 3. Create the document using prisma
    const newDiary = await prisma.diary.create({
      data: {
        content,
        authorId: userId,
      },
    });

    // If the diary way created yesterday, then we can increase the user's current streak.
    const lastMadeYesterday =
      mostRecentDiary && isYesterday(mostRecentDiary.dateCreated);

    // 5. Update the user's `hasCreatedDiaryToday` field
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        // If a last diary made was yesterday then increase the streak count else set to 0
        diaryStreak: lastMadeYesterday
          ? {
              increment: 1,
            }
          : 1,
      },
    });

    // 6. Send back the newly created Diary object to the client
    response.status(200).send({
      data: newDiary,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
