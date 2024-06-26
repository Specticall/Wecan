import { TMood } from "@/context/MoodContext";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(str: string, length: number) {
  return `${str.split("").splice(0, length).join("")}...`;
}

export function getMoodColor(mood: TMood) {
  switch (mood) {
    case "Ecstatic":
      return "rgb(38 70 83)";
    case "Happy":
      return "rgb(42 157 143)";
    case "Neutral":
      return "rgb(233 196 106)";
    case "Sad":
      return "rgb(244 162 97)";
    case "Depressed":
      return "rgb(231 111 81)";
    default:
      throw new Error(`Unknown mood: ${mood}`);
  }
}

export function getRandomElement<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function wait(timeMS: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMS);
  });
}

export function hasLoggedInToday(lastLogin: Date) {
  const lastLoginDate = new Date(lastLogin);
  const currentDate = new Date();

  // If the date of login are the exact same then the user has already logged in today.
  return (
    lastLoginDate.getFullYear() === currentDate.getFullYear() &&
    lastLoginDate.getMonth() === currentDate.getMonth() &&
    lastLoginDate.getDate() === currentDate.getDate()
  );
}

/**
 * Checks if the input date is today.
 */
export function isToday(inputDate: Date) {
  return (
    inputDate.getDate() === new Date().getDate() &&
    inputDate.getFullYear() === new Date().getFullYear() &&
    inputDate.getMonth() === new Date().getMonth()
  );
}

/**
 * Formats the date into a readable format (long or short)
 * long : "1 January 2021"
 * short: "01/01/21"
 * @param date
 * @param format
 * @returns
 */
export function formatDate(date: Date, format: "short" | "long" = "long") {
  if (format === "short")
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats number into a readable format
 * @param data
 * @returns
 * @example formatNumber(1000) // "1,000"
 */
export function formatNumber(data?: number) {
  if (data === undefined) return undefined;

  return data.toLocaleString("de-DE");
}

/**
 * Gets the time span of the current week start date end date in time stamp (used for the bar chart)
 * @returns
 */
export const getWeekStartAndEnd = () => {
  // const todayTimespan = new Date().
  const currentDate = new Date().getDay();
  const TIMESPAN_DAY = 24 * 60 * 60 * 1000;

  const startDate = Date.now() - currentDate * TIMESPAN_DAY;
  const endDate = startDate + TIMESPAN_DAY * 6;

  return {
    startDate: new Date(startDate).setHours(0, 0, 0, 0),
    endDate: new Date(endDate).setHours(23, 59, 59, 999),
  };
};

/**
 * Deletes the local storage keys
 * @param keys
 */
export const clearLocalStorage = (...keys: string[]) => {
  keys.forEach((key) => localStorage.removeItem(key));
};

/**
 * reverses an array
 * @param arr
 * @returns
 */
export const toReversed = <T>(arr: T[]) => {
  const reversed = [...arr].reverse();
  return reversed;
};
