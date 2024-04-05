import { TMood } from "@/types/general";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(str: string, length: number) {
  return `${str.split("").splice(0, length).join("")}...`;
}

/*
--neutral:rgb(233 196 106) ;
    --happy: rgb(42 157 143);
    --ecstatic: rgb(38 70 83);
    --sad: rgb(244 162 97);
    --depressed: rgb(231 111 81);
*/

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
