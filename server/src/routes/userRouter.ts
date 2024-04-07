import { Router } from "express";
import { protect } from "../controller/authController";
import { getUser } from "../controller/userController";

const router = Router();

router.get("/", protect, getUser);

export default router;
