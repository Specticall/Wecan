import { RequestHandler } from "express";
import { AppError } from "../utils/AppError";
import { prisma } from "../../prisma/prisma";

export const updateUserPoint: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.query.id as string;
    if (!userId)
      throw new AppError("'id' does not exist in the query string", 400);

    // const updatedUserPoint = await prisma.point.update({
    //   where: {
    //     userId,
    //   },
    //   {

    //   }
    // })
  } catch (error) {
    next(error);
  }
};
