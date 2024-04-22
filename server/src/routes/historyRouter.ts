import { Router } from "express";
import { getHistory } from "../controller/historyController";

const router = Router();

router.get("/", getHistory);

export default router;
