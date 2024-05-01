"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getJSON = async () => {
    const jsonTaskData = await promises_1.default.readFile(`./data/imageSeed.json`, "utf-8");
    if (!jsonTaskData)
        throw new Error("Something went wrong while trying to read the json seed data");
    const parsedJsonData = JSON.parse(jsonTaskData);
    await prisma.background.createMany({
        data: parsedJsonData.map((item) => {
            return {
                ...item,
                tier: Number(item.tier),
            };
        }),
    });
};
getJSON();
//# sourceMappingURL=seedImage.js.map