"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCors = void 0;
const allowCors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
};
exports.allowCors = allowCors;
//# sourceMappingURL=cors.js.map