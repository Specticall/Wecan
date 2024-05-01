"use strict";
/**
 * Stores helper functions that are used throughout the application.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPercentage = exports.isYesterday = exports.getTimeSpan = exports.buildPrismaSelectQueryObject = exports.isToday = exports.getRandomNumber = exports.verifyGoogleCredential = exports.createJWT = void 0;
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("./AppError");
/**
 * Creates a JWT token with the user id.
 * @param id user's id
 * @returns
 */
function createJWT(id) {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_STRING);
}
exports.createJWT = createJWT;
/**
 * Recieves a code from google OAuth's (using Authorization code flow) and returns the user's information. Used inconjuction with the `useGoogleLogin()` hook from "react google oauth" package on the frontend.
 *
 * Source : https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
 * @param code string
 * @returns
 */
async function verifyGoogleCredential(code) {
    // 1. Retrieve the client id and secret from the environment variables
    const clientId = process.env.GOOGLE_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    // 2. Create a new OAuth2Client instance using the client id and secret.
    // Note : "postmessage" is the redirect uri for the google OAuth2.0 client. Without this, the code cannot be traded for a token.
    const client = new google_auth_library_1.OAuth2Client(clientId, clientSecret, "postmessage");
    // 3. Trade the code for an access token
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token)
        throw new AppError_1.AppError("id token does not exist", 404);
    // 4. Verify the id token. This extracts the user's information such as email, profile picture, etc... from the hashed id token.
    const ticket = await client.verifyIdToken({
        idToken: tokens?.id_token,
        audience: clientId,
    });
    // 5. Extract the user's information from the ticket.
    const payload = ticket.getPayload();
    return payload;
}
exports.verifyGoogleCredential = verifyGoogleCredential;
/**
 * Generates a random number between the lower and upper bounds.
 * @param lower
 * @param upper
 * @returns
 * @example getRandomNumber(1, 10) // will return number between 1 and 10
 */
function getRandomNumber(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
exports.getRandomNumber = getRandomNumber;
/**
 * Checks if the input date is today.
 * @param inputDate
 * @returns
 */
function isToday(inputDate) {
    return (inputDate.getDate() === new Date().getDate() &&
        inputDate.getFullYear() === new Date().getFullYear() &&
        inputDate.getMonth() === new Date().getMonth());
}
exports.isToday = isToday;
/**
 * Converts an array of field into a prisma query select object
 * @param queries
 * @returns
 */
function buildPrismaSelectQueryObject(fields) {
    return fields.reduce((options, field) => {
        options[field] = true;
        return options;
    }, {});
}
exports.buildPrismaSelectQueryObject = buildPrismaSelectQueryObject;
/**
 * Calculates the start and end timestamp of a given day.
 * @param date
 * @returns
 */
function getTimeSpan(date) {
    // Start of the day
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // End of the day
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return { startOfDay, endOfDay };
}
exports.getTimeSpan = getTimeSpan;
function isYesterday(date) {
    const startOfYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const currentTimeSpan = date.getTime();
    return startOfYesterday <= currentTimeSpan && currentTimeSpan <= startOfToday;
}
exports.isYesterday = isYesterday;
function calcPercentage(numerator, denominator) {
    return denominator !== 0 ? Math.floor((numerator * 100) / denominator) : 0;
}
exports.calcPercentage = calcPercentage;
//# sourceMappingURL=helper.js.map