// This file is not used for the code itself, it's used to perform some mutation / seeding on the database manually

import fs from "fs/promises";

async function convert() {
  try {
    const jsonTaskData = await fs.readFile(
      `./data/availableTask.json`,
      "utf-8"
    );
    if (!jsonTaskData)
      throw new Error(
        "Something went wrong while trying to read the json seed data"
      );

    const parsedJsonData = JSON.parse(jsonTaskData) as Record<
      string,
      Record<string, unknown>[]
    >;

    const formattedJSONData = Object.entries(parsedJsonData).reduce(
      (final: Record<string, unknown>[], current) => {
        const [key, value] = current;
        const formattedMood = value.map((item) => {
          return { ...item, mood: key };
        });
        return [...final, ...formattedMood];
      },
      []
    );

    await fs.writeFile(
      `./data/convertedDvailableTask.json`,
      JSON.stringify(formattedJSONData)
    );
  } catch (err) {
    console.dir(err);
  }
}

convert();
