import { Router } from "express";
import { protect } from "../controller/authController";
import { createUserDiary, getUserDiaries } from "../controller/diaryController";

const router = Router();

// Retrieve user's diaries
router.get("/", protect, getUserDiaries);

// Create a new diary
router.post("/", protect, createUserDiary);

// Delete user's diary
router.delete("/");

export default router;
