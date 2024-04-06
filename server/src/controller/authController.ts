import { RequestHandler } from "express";
import { createJWT, verifyGoogleCredential } from "../utils/helper";
import { Mood, PrismaClient } from "@prisma/client";
import { TGoogleResponse } from "../utils/types";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();

export const googleLogin: RequestHandler = async (request, response, next) => {
  try {
    // Credential (JWT Token) is passed from the client side
    const { credential } = request.query;

    if (!credential) throw new AppError("Credential not provided!", 400);

    const dataFromGoogle = (await verifyGoogleCredential(
      credential as string
    )) as TGoogleResponse;

    if (!dataFromGoogle.email || !dataFromGoogle.name)
      throw new AppError(
        "Email or name does not exist on the google response object",
        500
      );

    // Find the corresponding user data
    let userData = await prisma.user.findUnique({
      where: {
        email: dataFromGoogle.email,
      },
      include: {
        point: true,
      },
    });

    // If user data does not yet exist on the database (first time login) then create one
    if (!userData) {
      await prisma.user.create({
        data: {
          email: dataFromGoogle.email,
          name: dataFromGoogle.name,
          mood: Mood.UNKOWN,
          lastLogin: new Date(Date.now()),
          point: {
            create: {
              earnedOverall: 0,
              earnedToday: 0,
              targetToday: 0,
            },
          },
        },
      });

      // Retrieve the data again to get a user object with the mongoDB's generated Object Id.
      userData = await prisma.user.findUnique({
        where: {
          email: dataFromGoogle.email,
        },
        include: {
          point: true,
        },
      });
    }

    if (!userData?.id) throw new AppError("Database id not found!", 404);

    const token = createJWT(userData.id);

    response.status(200).send({
      userData,
      token,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
