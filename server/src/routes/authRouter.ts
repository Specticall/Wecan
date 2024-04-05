import { Router } from "express";
import { googleLogin } from "../controller/authController";

const router = Router();

router.get("/google", googleLogin);

export default router;
