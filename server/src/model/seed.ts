import { PrismaClient } from "@prisma/client";

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

async function seed() {
  try {
    console.log("Seeding data, Please Wait...");

    // const defaultBackground = await prisma.background.findFirst({
    //   where: {
    //     name: "Dusk Embrace",
    //   },
    // });

    // if (!defaultBackground) {
    //   console.log("Default background does not exist");
    //   return;
    // }

    // const allGoals = await prisma.goal.findMany({});
    // if (!allGoals) {
    //   console.log("No goals exist");
    //   return;
    // }

    // for (const goal of allGoals) {
    //   await prisma.goal.update({
    //     where: {
    //       id: goal.id,
    //     },
    //     data: {
    //       hasClaimedReward: false,
    //     },
    //   });
    // }

    const user = await prisma.user.findFirst({
      where: {
        email: "josephyusmita@gmail.com",
      },
    });

    const allUserGoal = await prisma.goal.findMany({
      where: {
        userId: user?.id,
      },
    });

    const allUserGoalId = allUserGoal.map((goal) => goal.id);

    const allHistory = await prisma.history.findMany({
      where: {
        goalId: {
          in: allUserGoalId,
        },
      },
    });

    for (const history of allHistory) {
      await prisma.history.update({
        where: {
          id: history.id,
        },
        data: {
          status: "Completed",
        },
      });
    }

    console.log("Seeding completed");
  } catch (err) {
    console.log(
      "On no! something went wrong while trying to seed your data",
      err
    );
  }
}

seed();
