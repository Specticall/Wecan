import { RequestHandler } from "express";
import { createJWT, verifyGoogleCredential } from "../utils/helper";
import { Mood, PrismaClient } from "@prisma/client";
import { TGoogleResponse } from "../utils/types";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { refreshUserData } from "./userController";

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
          mood: Mood.Unknown,
          pictureURL: dataFromGoogle.picture || "",
          hasCreatedDiaryToday: false,
          lastLogin: new Date(Date.now()),
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
      if (!userData || !userData.point)
        throw new AppError(
          "Something went wrong while trying to retrieve the user data",
          500
        );
    }

    // Updates some fields in respect to the current time
    const refreshedUserData = await refreshUserData(userData);

    if (!refreshedUserData?.id)
      throw new AppError("Database id not found!", 404);

    const token = createJWT(refreshedUserData.id);

    response.status(200).send({
      userData: refreshedUserData,
      token,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const protect: RequestHandler = async (request, response, next) => {
  try {
    // 1. Retrieve token from the header
    const { authorization: bearerToken } = request.headers;
    if (!bearerToken)
      throw new AppError("Authorization header does not exist", 401);

    // 2. Parse the token from the header string
    const token = bearerToken.split(" ")[1];
    if (!token) throw new AppError("JWT was not found in the header", 401);

    // 3. verity the token against the secret string
    const tokenIsValid = jwt.verify(
      token,
      process.env.JWT_STRING
    ) as JwtPayload;
    if (!tokenIsValid) throw new AppError("Invalid login token", 401);

    next();
  } catch (error) {
    next(error);
  }
};
