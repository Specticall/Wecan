/**
 * Stores helper functions that are used throughout the application.
 */

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

/**
 * Creates a JWT token with the user id.
 * @param id user's id
 * @returns
 */
export function createJWT(id: string) {
  return jwt.sign({ id }, process.env.JWT_STRING);
}

/**
 * Recieves a code from google OAuth's (using Authorization code flow) and returns the user's information. Used inconjuction with the `useGoogleLogin()` hook from "react google oauth" package on the frontend.
 *
 * Source : https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
 * @param code string
 * @returns
 */
export async function verifyGoogleCredential(code: string) {
  // 1. Retrieve the client id and secret from the environment variables
  const clientId = process.env.GOOGLE_ID;
  const clientSecret = process.env.GOOGLE_SECRET;

  // 2. Create a new OAuth2Client instance using the client id and secret.
  // Note : "postmessage" is the redirect uri for the google OAuth2.0 client. Without this, the code cannot be traded for a token.
  const client = new OAuth2Client(clientId, clientSecret, "postmessage");

  // 3. Trade the code for an access token
  const { tokens } = await client.getToken(code);
  if (!tokens.id_token) throw new AppError("id token does not exist", 404);

  // 4. Verify the id token. This extracts the user's information such as email, profile picture, etc... from the hashed id token.
  const ticket = await client.verifyIdToken({
    idToken: tokens?.id_token,
    audience: clientId,
  });

  // 5. Extract the user's information from the ticket.
  const payload = ticket.getPayload();

  return payload;
}

/**
 * Generates a random number between the lower and upper bounds.
 * @param lower
 * @param upper
 * @returns
 * @example getRandomNumber(1, 10) // will return number between 1 and 10
 */
export function getRandomNumber(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * Checks if the input date is today.
 * @param inputDate
 * @returns
 */
export function isToday(inputDate: Date) {
  return (
    inputDate.getDate() === new Date().getDate() &&
    inputDate.getFullYear() === new Date().getFullYear() &&
    inputDate.getMonth() === new Date().getMonth()
  );
}

/**
 * Converts an array of field into a prisma query select object
 * @param queries
 * @returns
 */
export function buildPrismaSelectQueryObject(fields: string[]) {
  return fields.reduce((options: Record<string, boolean>, field) => {
    options[field] = true;
    return options;
  }, {});
}

/**
 * Calculates the start and end timestamp of a given day.
 * @param date
 * @returns
 */
export function getTimeSpan(date: Date) {
  // Start of the day
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // End of the day
  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  return { startOfDay, endOfDay };
}

export function isYesterday(date: Date) {
  const startOfYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).setHours(
    0,
    0,
    0,
    0
  );

  const startOfToday = new Date().setHours(0, 0, 0, 0);

  const currentTimeSpan = date.getTime();

  return startOfYesterday <= currentTimeSpan && currentTimeSpan <= startOfToday;
}

export function calcPercentage(numerator: number, denominator: number) {
  return denominator !== 0 ? Math.floor((numerator * 100) / denominator) : 0;
}
