import { RequestHandler } from "express";
import { googleAuthURL, oAuth2Client } from "../googleAuth";
import { google } from "googleapis";
import { createJWT } from "../utils/helper";
import { Mood, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const googleLogin: RequestHandler = async (request, response) => {
  response.redirect(googleAuthURL);
};

// This endpoint will get hit then the user successfuly logs in.
export const googleCallback: RequestHandler = async (request, response) => {
  try {
    // Google will return a code as a URL query parameter.
    const { code } = request.query;

    // Using the code above, we can then request a token from google.
    const { tokens } = await oAuth2Client.getToken(code as string);

    oAuth2Client.setCredentials(tokens);

    // Retrieve user info from the given token
    const oAuth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });

    const { data: dataFromGoogle } = await oAuth2.userinfo.get();

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
