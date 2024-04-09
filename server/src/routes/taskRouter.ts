import { Router } from "express";
import { generateAvailableTask } from "../controller/taskController";
import { protect } from "../controller/authController";

const router = Router();

router.get("/generated", protect, generateAvailableTask);

export default router;
