import express from "express";
import cors from "cors";
import { BASE_ENDPOINT } from "./utils/config";
import authRouter from "./routes/authRouter";
const app = express();

// Enable fetching from localhost
app.use(cors());

// Middle to parse body request
app.use(express.json());

// Main Endpoints
app.use(`${BASE_ENDPOINT}/v1/users`, async () => {
  console.log("HELLO FROM USER ENDPOINT");
});
app.use(`${BASE_ENDPOINT}/v1/auth`, authRouter);

export default app;
