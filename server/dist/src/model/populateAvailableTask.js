"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
/*
Used to seed the available task that will be given to the user
*/
const prisma = new client_1.PrismaClient();
async function startSeed() {
    try {
        const jsonTaskData = await promises_1.default.readFile(`./data/availableTask.json`, "utf-8");
        if (!jsonTaskData)
            throw new Error("Something went wrong while trying to read the json seed data");
        const parsedJsonData = JSON.parse(jsonTaskData);
        await prisma.availableTask.deleteMany();
        await prisma.availableTask.createMany({
            data: parsedJsonData,
        });
    }
    catch (err) {
        console.dir(err);
    }
}
startSeed();
//# sourceMappingURL=populateAvailableTask.js.map