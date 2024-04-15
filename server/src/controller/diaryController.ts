import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
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
    const { content, id: userId } = request.body;
    if (!content || !userId)
      throw new AppError(
        "Either content, mood or userId are missing in the request body",
        400
      );

    // 2. Create the document using prisma
    const newDiary = await prisma.diary.create({
      data: {
        content,
        authorId: userId,
      },
    });
    if (!newDiary)
      throw new AppError(
        "Something wen't wrong while trying to create the diary",
        500
      );

    // 4. Update the user's `hasCreatedDiaryToday` field
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasCreatedDiaryToday: true,
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
