import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

const difficultyRange = [
  { difficulty: "Easy", min: 50000, max: 150000, color: "rgb(42 157 143)" },
  { difficulty: "Medium", min: 200000, max: 350000, color: "rgb(74 90 239)" },
  { difficulty: "Hard", min: 40000, max: 500000, color: "rgb(231 111 81)" },
] as const;

const findDifficulty = (point: number) => {
  const range = difficultyRange.find(
    (range) => range.min <= point && point <= range.max
  );
  if (!range) throw new Error(`No difficulty from ${point} points was found`);
  return range;
};

type ImageType = {
  URL: string;
  name: string;
  tier: string;
};

async function seed() {
  try {
    console.log("Seeding data, Please Wait...");

    const jsonTaskData = await fs.readFile(`./data/imageSeed.json`, "utf-8");

    if (!jsonTaskData)
      throw new Error(
        "Something went wrong while trying to read the json seed data"
      );
    const JSONData = JSON.parse(jsonTaskData) as ImageType[];

    for (const data of JSONData) {
      const isAlreadyInDB = await prisma.background.findFirst({
        where: {
          URL: data.URL,
          name: data.name,
        },
      });

      if (isAlreadyInDB) continue;

      await prisma.background.create({
        data: {
          URL: data.URL,
          name: data.name,
          tier: Number(data.tier),
        },
      });
    }
    // console.log(JSONData);

    console.log("Seeding completed");
  } catch (err) {
    console.log(
      "On no! something went wrong while trying to seed your data",
      err
    );
  }
}

seed();
