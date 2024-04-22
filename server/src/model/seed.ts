import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding data, Please Wait...");

    await prisma.history.updateMany({
      data: {
        completionPercent: 0,
      },
    });
    console.log("Seeding completed");
  } catch (err) {
    console.log(
      "On no! something went wrong while trying to seed your data",
      err
    );
  }
}

seed();
