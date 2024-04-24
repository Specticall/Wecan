"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const diaryController_1 = require("../controller/diaryController");
const router = (0, express_1.Router)();
// Retrieve user's diaries
router.get("/", authController_1.protect, diaryController_1.getUserDiaries);
// Create a new diary
router.post("/", authController_1.protect, diaryController_1.createUserDiary);
// Delete user's diary
router.delete("/");
exports.default = router;
//# sourceMappingURL=diaryRouter.js.map