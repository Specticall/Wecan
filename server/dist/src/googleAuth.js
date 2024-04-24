"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthURL = exports.oAuth2Client = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require("./utils/config");
exports.oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, `${config_1.BASE_URL}${config_1.BASE_ENDPOINT}/v1/auth/google/callback`);
const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
exports.googleAuthURL = exports.oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope,
    include_granted_scopes: true,
});
//# sourceMappingURL=googleAuth.js.map