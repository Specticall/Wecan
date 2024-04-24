"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/", authController_1.protect, userController_1.getUser);
router.patch("/", authController_1.protect, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map