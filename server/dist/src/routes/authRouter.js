"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.get("/google", authController_1.googleLogin);
exports.default = router;
//# sourceMappingURL=authRouter.js.map