import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

/*
Used to seed the available task that will be given to the user
*/
const prisma = new PrismaClient();

type TaskData = {
  title: "Learn a new dance routine";
  points: 3300;
  description: "Pick a dance style you've always wanted to try and learn a new routine through online tutorials or classes. Have fun and get moving!";
  mood: "Ecstatic";
};

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

    const parsedJsonData = JSON.parse(jsonTaskData) as TaskData[];

    for (const taskData of parsedJsonData) {
      console.log(taskData);
      if (!taskData) throw new Error("no taskData");
      const dbTask = await prisma.availableTask.findFirst({
        where: {
          description: taskData.description,
          title: taskData.title,
          mood: taskData.mood,
        },
      });

      if (!dbTask) throw new Error("no db task");

      console.log(dbTask);
      await prisma.availableTask.update({
        where: {
          id: dbTask.id,
        },
        data: {
          points: taskData.points,
        },
      });
    }
    // await prisma.availableTask.deleteMany();

    // await prisma.availableTask.createMany({
    //   data: parsedJsonData,
    // });
  } catch (err) {
    console.dir(err);
  }
}

startSeed();
