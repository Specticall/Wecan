import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

/*
Used to seed the available task that will be given to the user
*/
const prisma = new PrismaClient();

async function startSeed() {
  try {
    const jsonTaskData = await fs.readFile(
      `./data/availableTask.json`,
      "utf-8"
    );
    if (!jsonTaskData)
      throw new Error(
        "Something went wrong while trying to read the json seed data"
      );

    const parsedJsonData = JSON.parse(jsonTaskData);
    await prisma.availableTask.deleteMany();

    await prisma.availableTask.createMany({
      data: parsedJsonData,
    });
  } catch (err) {
    console.dir(err);
  }
}

startSeed();
