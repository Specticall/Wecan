"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    try {
        console.log("Seeding data, Please Wait...");
        await prisma.user.updateMany({
            data: {
                hasSetMoodToday: false,
            },
        });
        console.log("Seeding completed");
    }
    catch (err) {
        console.log("On no! something went wrong while trying to seed your data", err);
    }
}
seed();
//# sourceMappingURL=seed.js.map