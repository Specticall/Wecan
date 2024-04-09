import { Router } from "express";
import {
  addUserTask,
  deleteUserTask,
  generateAvailableTask,
  getUserTask,
} from "../controller/taskController";
import { protect } from "../controller/authController";

const router = Router();

router.get("/generated", protect, generateAvailableTask);

router.get("/", protect, getUserTask);
router.post("/", protect, addUserTask);
router.delete("/", protect, deleteUserTask);

export default router;
