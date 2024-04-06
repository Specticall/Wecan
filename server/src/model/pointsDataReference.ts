import { Mood } from "@prisma/client";
import { getRandomNumber } from "../utils/helper";

const pointReference = {
  DEPRESSED: {
    upper: 10000,
    lower: 8000,
  },
  SAD: {
    upper: 8000,
    lower: 6000,
  },
  NEUTRAL: {
    upper: 6000,
    lower: 4000,
  },
  HAPPY: {
    upper: 4000,
    lower: 2000,
  },
  ECSTATIC: {
    upper: 2000,
    lower: 1000,
  },
} as const;

/**
 * Returns a number that indicates the wellness point a user needs to earned that is generated based on the mood they gave.
 */
export function getPointsByMood(mood: Exclude<Mood, "UNKNOWN">) {
  const { lower, upper } = pointReference[mood];
  return getRandomNumber(lower / 100, upper / 100) * 100;
}
