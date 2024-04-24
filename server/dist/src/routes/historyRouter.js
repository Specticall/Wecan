"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historyController_1 = require("../controller/historyController");
const router = (0, express_1.Router)();
router.get("/", historyController_1.getHistory);
exports.default = router;
//# sourceMappingURL=historyRouter.js.map