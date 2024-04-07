import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const handleErrorProduction: ErrorRequestHandler = async () =>
  // error,
  // request,
  // response
  {};

export const handleErrorDevelopment: ErrorRequestHandler = async (
  error: AppError | Error,
  request,
  response,
  next
) => {
  if (error.message === "invalid token") {
    error = new AppError("Invalid JWT Token", 401);
  }

  console.log(error, error instanceof AppError);

  if (error instanceof AppError) {
    response.status(error.statusCode).send({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  response.status(500).send({
    status: "fail",
    statusCode: 500,
    message: "Something went very wrong!",
    stack: error.stack,
  });
};
