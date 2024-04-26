import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getJSON = async () => {
  const jsonTaskData = await fs.readFile(`./data/imageSeed.json`, "utf-8");
  if (!jsonTaskData)
    throw new Error(
      "Something went wrong while trying to read the json seed data"
    );

  const parsedJsonData = JSON.parse(jsonTaskData) as {
    URL: string;
    name: string;
    tier: 1 | 2 | 3;
  }[];

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
