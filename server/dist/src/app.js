"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const diaryRouter_1 = __importDefault(require("./routes/diaryRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
const goalRouter_1 = __importDefault(require("./routes/goalRouter"));
const historyRouter_1 = __importDefault(require("./routes/historyRouter"));
const config_1 = require("./utils/config");
const errorController_1 = require("./controller/errorController");
const AppError_1 = require("./utils/AppError");
const app = (0, express_1.default)();
// Enable fetching from localhost
app.use((0, cors_1.default)());
// Middleware to parse body request
app.use(express_1.default.json());
// Main Endpoints
app.use(`${config_1.BASE_ENDPOINT}/v1/user`, userRouter_1.default);
app.use(`${config_1.BASE_ENDPOINT}/v1/auth`, authRouter_1.default);
app.use(`${config_1.BASE_ENDPOINT}/v1/diary`, diaryRouter_1.default);
app.use(`${config_1.BASE_ENDPOINT}/v1/task`, taskRouter_1.default);
app.use(`${config_1.BASE_ENDPOINT}/v1/goal`, goalRouter_1.default);
app.use(`${config_1.BASE_ENDPOINT}/v1/history`, historyRouter_1.default);
// Handle invalid routes
app.use("*", (request, response, next) => {
    next(new AppError_1.AppError("The route you requested does not exist", 404));
});
app.use(errorController_1.handleErrorDevelopment);
exports.default = app;
//# sourceMappingURL=app.js.map