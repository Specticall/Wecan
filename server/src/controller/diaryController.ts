import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getUserDiaries: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    // 1. Retrieve the user id from the user body
    const { userId } = request.body;
    if (!userId)
      throw new Error("This request is missing `userId` in the body");

    // 2. Retrieve the user diaries
    const userDiaries = await prisma.diary.findMany({
      where: {
        authorId: userId,
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
