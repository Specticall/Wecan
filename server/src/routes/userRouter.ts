import { Router } from "express";
import { protect } from "../controller/authController";
import { getUser, updateUser } from "../controller/userController";

const router = Router();

router.get("/", protect, getUser);
router.patch("/", protect, updateUser);

export default router;
