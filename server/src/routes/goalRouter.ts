import { Router } from "express";
import { protect } from "../controller/authController";
import { getUserGoal, updateUserGoal } from "../controller/goalController";

const router = Router();

router.post("/", protect, updateUserGoal);
router.get("/", protect, getUserGoal);

export default router;
