import { useMood } from "@/context/MoodContext";
import { getMoodColor } from "@/lib/utils";
import MoodDropdown from "../moodModal/MoodDropdown";
import { ReactNode } from "react";

export default function CurrentMood({ children }: { children: ReactNode }) {
  const { currentMood } = useMood();

  return (
    <article
      className="bg-accent px-6 py-6 rounded-lg flex items-center justify-center gap-6 transition-all duration-100"
      style={
        currentMood ? { backgroundColor: getMoodColor(currentMood) } : undefined
      }
    >
      <div className="w-14 aspect-square rounded-full bg-white"></div>
      <div className="flex-1">{children}</div>
      <MoodDropdown />
    </article>
  );
}
