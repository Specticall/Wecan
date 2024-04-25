import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter";
import diaryRouter from "./routes/diaryRouter";
import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRouter";
import goalRouter from "./routes/goalRouter";
import historyRouter from "./routes/historyRouter";

import { BASE_ENDPOINT } from "./utils/config";
import { handleErrorDevelopment } from "./controller/errorController";
import { AppError } from "./utils/AppError";
import { allowCors } from "./utils/cors";

const app = express();

// Enable fetching from localhost
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(allowCors);

// Middleware to parse body request
app.use(express.json());

// Main Endpoints
app.use(`${BASE_ENDPOINT}/v1/user`, userRouter);
app.use(`${BASE_ENDPOINT}/v1/auth`, authRouter);
app.use(`${BASE_ENDPOINT}/v1/diary`, diaryRouter);
app.use(`${BASE_ENDPOINT}/v1/task`, taskRouter);
app.use(`${BASE_ENDPOINT}/v1/goal`, goalRouter);
app.use(`${BASE_ENDPOINT}/v1/history`, historyRouter);

// Handle invalid routes
app.use("*", (request, response, next) => {
  next(new AppError("The route you requested does not exist", 404));
});

app.use(handleErrorDevelopment);

export default app;
