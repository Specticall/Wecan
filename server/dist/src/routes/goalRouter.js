"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const goalController_1 = require("../controller/goalController");
const router = (0, express_1.Router)();
router.post("/", authController_1.protect, goalController_1.createUserGoal);
router.patch("/", authController_1.protect, goalController_1.updateUserGoal);
router.get("/", authController_1.protect, goalController_1.getUserGoal);
router.get("/all", authController_1.protect, goalController_1.getAllUserGoals);
router.post("/claim", authController_1.protect, goalController_1.claimGoalReward);
exports.default = router;
//# sourceMappingURL=goalRouter.js.map