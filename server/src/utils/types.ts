import { PrismaClient } from "@prisma/client";

/**
 * Response from Google OAuth2.0
 */
export type TGoogleResponse = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
  jti: string;
};

/**
 * Type for prisma client that is used in transactions. This is made so we can pass the prisma transaction instance to another function and include them in the transaction.
 */
export type PrismaTransactionalClient = Parameters<
  Parameters<PrismaClient["$transaction"]>[0]
>[0];
