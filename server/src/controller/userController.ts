import { isToday } from "../utils/helper";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 *  Updates user's daily data based on the last login date.
 *  If the last login date is not today, it resets the `hasCreatedDiaryToday` field to false and some other fields on the `Point` document
 */
export const refreshUserData = async (userData: User) => {
  // Check if the last time user logged is today or not, if not then the diary should be renewed
  const isANewDay = !isToday(userData.lastLogin);

  const updatedUser = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      lastLogin: new Date(),

      // Reset the diary and point data if its a new day.
      hasCreatedDiaryToday: isANewDay ? false : userData.hasCreatedDiaryToday,
      point: {
        update: isANewDay
          ? {
              earnedToday: 0,
              targetToday: 0,
            }
          : {},
      },
    },
    include: {
      point: true,
    },
  });

  return updatedUser;
};
