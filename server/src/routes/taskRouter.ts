import { Router } from "express";
import {
  addUserTask,
  completedUserTask,
  deleteUserTask,
  generateAvailableTask,
  getUserTask,
  updateUserTask,
} from "../controller/taskController";
import { protect } from "../controller/authController";

const router = Router();

router.get("/generated", protect, generateAvailableTask);

router.get("/", protect, getUserTask);
router.post("/", protect, addUserTask);
router.post("/completed", protect, completedUserTask);
router.delete("/", protect, deleteUserTask);
router.patch("/", protect, updateUserTask);

export default router;
