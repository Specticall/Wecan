import { Router } from "express";
import {
  getBackgrounds,
  getUserBackground,
  setUserBackground,
} from "../controller/backgroundController";
import { protect } from "../controller/authController";

const router = Router();

router.patch("/user", protect, setUserBackground);

router.get("/user/:id", protect, getUserBackground);
router.get("/", getBackgrounds);

export default router;
