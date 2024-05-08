import { google } from "googleapis";
import { BASE_ENDPOINT, BASE_URL } from "./utils/config";

/*
This implementation is no longer used because the following implementation has been handle on the frontend using the `react-oauth/google` package. We're not deleting this because we might need a manual implentation for a google login
*/

export const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  `${BASE_URL}${BASE_ENDPOINT}/v1/auth/google/callback`
);

const scope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const googleAuthURL = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope,
  include_granted_scopes: true,
});
