"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.googleLogin = void 0;
const helper_1 = require("../utils/helper");
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController_1 = require("./userController");
const prisma = new client_1.PrismaClient();
const googleLogin = async (request, response, next) => {
    try {
        // Credential (JWT Token) is passed from the client side
        const { credential } = request.query;
        if (!credential)
            throw new AppError_1.AppError("Credential not provided!", 400);
        const dataFromGoogle = (await (0, helper_1.verifyGoogleCredential)(credential));
        if (!dataFromGoogle.email || !dataFromGoogle.name)
            throw new AppError_1.AppError("Email or name does not exist on the google response object", 500);
        // Find the corresponding user data
        let userData = await prisma.user.findUnique({
            where: {
                email: dataFromGoogle.email,
            },
            include: {
                point: true,
            },
        });
        // If user data does not yet exist on the database (first time login) then create one
        if (!userData) {
            await prisma.user.create({
                data: {
                    email: dataFromGoogle.email,
                    name: dataFromGoogle.name,
                    mood: client_1.Mood.Unknown,
                    pictureURL: dataFromGoogle.picture || "",
                },
            });
            // Retrieve the data again to get a user object with the mongoDB's generated Object Id.
            userData = await prisma.user.findUnique({
                where: {
                    email: dataFromGoogle.email,
                },
                include: {
                    point: true,
                },
            });
            if (!userData)
                throw new AppError_1.AppError("Something went wrong while trying to retrieve the user data", 500);
        }
        // Updates some fields in respect to the current time
        const refreshedUserData = await (0, userController_1.refreshUserData)(userData);
        if (!refreshedUserData?.id)
            throw new AppError_1.AppError("Database id not found!", 404);
        const token = (0, helper_1.createJWT)(refreshedUserData.id);
        response.status(200).send({
            userData: refreshedUserData,
            token,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.googleLogin = googleLogin;
const protect = async (request, response, next) => {
    try {
        // 1. Retrieve token from the header
        const { authorization: bearerToken } = request.headers;
        if (!bearerToken)
            throw new AppError_1.AppError("Authorization header does not exist", 401);
        // 2. Parse the token from the header string
        const token = bearerToken.split(" ")[1];
        if (!token)
            throw new AppError_1.AppError("JWT was not found in the header", 401);
        // 3. verity the token against the secret string
        const tokenIsValid = jsonwebtoken_1.default.verify(token, process.env.JWT_STRING);
        if (!tokenIsValid)
            throw new AppError_1.AppError("Invalid login token", 401);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.protect = protect;
//# sourceMappingURL=authController.js.map