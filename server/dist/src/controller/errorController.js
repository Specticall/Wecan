"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorDevelopment = exports.handleErrorProduction = void 0;
const AppError_1 = require("../utils/AppError");
const handleErrorProduction = async () => { };
exports.handleErrorProduction = handleErrorProduction;
const handleErrorDevelopment = async (error, request, response, next) => {
    if (error.message === "invalid token") {
        error = new AppError_1.AppError("Invalid JWT Token", 401);
    }
    console.log(error, error instanceof AppError_1.AppError);
    if (error instanceof AppError_1.AppError) {
        response.status(error.statusCode).send({
            status: error.status,
            statusCode: error.statusCode,
            message: error.message,
            stack: error.stack,
        });
        return;
    }
    response.status(500).send({
        status: "fail",
        statusCode: 500,
        message: "Something went very wrong!",
        stack: error.stack,
    });
};
exports.handleErrorDevelopment = handleErrorDevelopment;
//# sourceMappingURL=errorController.js.map