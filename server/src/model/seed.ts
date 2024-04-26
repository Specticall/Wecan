import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding data, Please Wait...");

    const defaultBackground = await prisma.background.findFirst({
      where: {
        name: "Dusk Embrace",
      },
    });

    if (!defaultBackground) {
      console.log("Default background does not exist");
      return;
    }

    // const users = await prisma.user.findMany({});

    // for (const user of users) {
    //   await prisma.user.update({
    //     where: {
    //       id: user.id,
    //     },
    //     data: {
    //       ownedBackground: {
    //         create: {
    //           backgroundId: defaultBackground.id,
    //         },
    //       },
    //     },
    //   });
    // }
    await prisma.user.update({
      where: {
        email: "josephyusmita@gmail.com",
      },
      data: {
        ownedBackground: {
          create: {
            backgroundId: defaultBackground.id,
          },
        },
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
