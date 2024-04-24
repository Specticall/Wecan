"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// Configure enviroment variables
(0, dotenv_1.config)({ path: "./.env" });
//////////////////////////
const app_1 = __importDefault(require("./app"));
require("./server");
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Application Running on port ${PORT}...`);
});
//# sourceMappingURL=index.js.map