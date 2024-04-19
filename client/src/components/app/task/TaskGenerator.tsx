import "@/styles/animation.css";
import TaskGeneratorCTA from "./TaskGeneratorCTA";
import GeneratorTaskCard from "./GeneratorTaskCard";
import { useState } from "react";

export default function TaskGenerator() {
  // State to make sure a load takes at least one second so that the transition animation can play without getting interupted in the case of a very fast response.
  const [shuffling, setShuffling] = useState(false);

  return (
    <div className="w-full self-stretch flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
        <GeneratorTaskCard isShuffling={shuffling} />
        <TaskGeneratorCTA setShuffling={setShuffling} />
      </div>
    </div>
  );
}
