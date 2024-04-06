import express from "express";
import cors from "cors";
import { BASE_ENDPOINT } from "./utils/config";
import authRouter from "./routes/authRouter";
import diaryRouter from "./routes/diaryRouter";
import {
  handleErrorDevelopment,
  handleErrorProduction,
} from "./controller/errorController";
import { AppError } from "./utils/AppError";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

// Main Endpoints
app.use(`${BASE_ENDPOINT}/v1/auth`, authRouter);
app.use(`${BASE_ENDPOINT}/v1/diary`, diaryRouter);

// Handle invalid routes
app.use("*", (request, response, next) => {
  next(new AppError("The route you requested does not exist", 404));
});

app.use(handleErrorDevelopment);
// app.use(
//   process.env.NODE_ENV === "production"
//     ? handleErrorProduction
//     : handleErrorDevelopment
// );

export default app;
