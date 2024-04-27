import { Router } from "express";
import { protect } from "../controller/authController";
import {
  claimGoalReward,
  createUserGoal,
  getUserGoal,
  updateUserGoal,
} from "../controller/goalController";

const router = Router();

router.post("/", protect, createUserGoal);
router.patch("/", protect, updateUserGoal);
router.get("/", protect, getUserGoal);
router.post("/claim", protect, claimGoalReward);

export default router;
