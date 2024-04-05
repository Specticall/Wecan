import { RequestHandler } from "express";
import { createJWT, verifyGoogleCredential } from "../utils/helper";
import { Mood, PrismaClient } from "@prisma/client";
import { TGoogleResponse } from "../utils/types";

const prisma = new PrismaClient();

export const googleLogin: RequestHandler = async (request, response) => {
  try {
    // Credential (JWT Token) is passed from the client side
    const { credential } = request.query;

    if (!credential) throw new Error("Credential not provided!");

    const dataFromGoogle = (await verifyGoogleCredential(
      credential as string
    )) as TGoogleResponse;

    if (!dataFromGoogle.email || !dataFromGoogle.name)
      throw new Error(
        "Email or name does not exist on the google response object"
      );

    // Find the corresponding user data
    let userData = await prisma.user.findUnique({
      where: {
        email: dataFromGoogle.email,
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
      });
    }

    if (!userData?.id) throw new Error("Database id not found!");

    const token = createJWT(userData.id);

    response.status(200).send({
      ...userData,
      token,
      status: "success",
    });
  } catch (error) {
    response.status(500).send({
      status: 500,
      errorMessage:
        error instanceof Error
          ? error.message
          : "Oops, Something went very wrong!",
      error,
    });
  }
};
