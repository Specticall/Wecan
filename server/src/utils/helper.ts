import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export function createJWT(id: string) {
  return jwt.sign({ id }, process.env.JWT_STRING);
}

export async function verifyGoogleCredential(jtwToken: string) {
  const clientId = process.env.GOOGLE_ID;

  const client = new OAuth2Client(clientId);

  const ticket = await client.verifyIdToken({
    idToken: jtwToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  return payload;
}
