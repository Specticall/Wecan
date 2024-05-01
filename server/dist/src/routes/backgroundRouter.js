"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const backgroundController_1 = require("../controller/backgroundController");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
router.patch("/user", authController_1.protect, backgroundController_1.setUserBackground);
router.get("/user/:id", authController_1.protect, backgroundController_1.getUserBackground);
router.get("/", backgroundController_1.getBackgrounds);
exports.default = router;
//# sourceMappingURL=backgroundRouter.js.map