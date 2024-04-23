import "@/styles/animation.css";
import TaskGeneratorCTA from "./TaskGeneratorCTA";
import GeneratorTaskCard from "./GeneratorTaskCard";
import { useState } from "react";
import useGoalMutation from "@/hooks/useGoalMutation";
import personTinkering from "/assets/goals-erase-anxiety.png";

export default function TaskGenerator() {
  // State to make sure a load takes at least one second so that the transition animation can play without getting interupted in the case of a very fast response.
  const [shuffling, setShuffling] = useState(false);
  const { goalData } = useGoalMutation();

  const hasCompletedGoal = goalData?.status === "Completed";
  return (
    <div className="w-full self-stretch flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
        {hasCompletedGoal ? (
          <div className="h-[22.5rem] flex flex-col items-center justify-center border-border border-[1px] rounded-xl  dotted-grid p-8">
            {/* <img src={personTinkering} alt="" className="h-full" /> */}
            <i className="bx bxs-check-circle text-2xl text-accent mb-4"></i>
            <h2 className="text-lg font-semibold tex-dark mb-3">
              You Have Completed Your Goal.
            </h2>
            <p className="text-light">
              Tasks can only be generated when your goal is not yet completed
            </p>
          </div>
        ) : (
          <GeneratorTaskCard isShuffling={shuffling} />
        )}
        <TaskGeneratorCTA
          setShuffling={setShuffling}
          hasCompletedGoal={hasCompletedGoal}
        />
      </div>
    </div>
  );
}
