import { useMood } from "@/context/MoodContext";
import CurrentMood from "./CurrentMood";

import "@/styles/animation.css";

import ShuffleShortcutTooltip from "./ShuffleShortcutTooltip";
import TaskGeneratorCTA from "./TaskGeneratorCTA";
import GeneratorTaskCard from "./GeneratorTaskCard";

export default function TaskGenerator() {
  const { currentMood } = useMood();

  return (
    <div className="w-full self-stretch pr-24 flex flex-col">
      <p className="text-lighter mb-4">Task Generator</p>
      <CurrentMood>
        <p className="text-lightest">Generating Task for</p>
        <h2 className="text-md text-white">
          {currentMood ? `${currentMood} Mood` : "All Moods"}
        </h2>
      </CurrentMood>
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
        <GeneratorTaskCard />
        <TaskGeneratorCTA />
      </div>
      <ShuffleShortcutTooltip />
    </div>
  );
}
