import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export function createJWT(id: string) {
  return jwt.sign({ id }, process.env.JWT_STRING);
}

export async function verifyGoogleCredential(jtwToken: string) {
  const clientId = process.env.GOOGLE_ID;

  const client = new OAuth2Client(clientId);
  console.log(client, clientId);
  const ticket = await client.verifyIdToken({
    idToken: jtwToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  return payload;
}

export function getRandomNumber(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * Checks if the input date is today.
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
  return denominator !== 0 ? Math.round((numerator * 100) / denominator) : 0;
}
