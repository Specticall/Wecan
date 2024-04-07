import { Mood } from "@prisma/client";
import { getRandomNumber } from "../utils/helper";

const pointReference = {
  Depressed: {
    upper: 10000,
    lower: 8000,
  },
  Sad: {
    upper: 8000,
    lower: 6000,
  },
  Neutral: {
    upper: 6000,
    lower: 4000,
  },
  Happy: {
    upper: 4000,
    lower: 2000,
  },
  Ecstatic: {
    upper: 2000,
    lower: 1000,
  },
} as const;

/**
 * Returns a number that indicates the wellness point a user needs to earned that is generated based on the mood they gave.
 */
export function getPointsByMood(mood: Exclude<Mood, "Unknown">) {
  const { lower, upper } = pointReference[mood];
  return getRandomNumber(lower / 100, upper / 100) * 100;
}
