"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.get("/generated", authController_1.protect, taskController_1.generateAvailableTask);
router.get("/", authController_1.protect, taskController_1.getUserTask);
router.post("/", authController_1.protect, taskController_1.addUserTask);
router.post("/completed", authController_1.protect, taskController_1.completedUserTask);
router.delete("/", authController_1.protect, taskController_1.deleteUserTask);
router.patch("/", authController_1.protect, taskController_1.updateUserTask);
exports.default = router;
//# sourceMappingURL=taskRouter.js.map