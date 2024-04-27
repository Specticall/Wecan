import Button from "@/components/general/Button";
import GoalSlider from "@/components/onboarding/GoalSlider";
import useGoalMutation from "@/hooks/useGoalMutation";
import { useState } from "react";

const DEFAULT_POINTS = 150000;

export default function DashboardNewGoal() {
  const { createMutation } = useGoalMutation();
  const [target, setTarget] = useState(DEFAULT_POINTS);

  const handleCreateGoal = () => {
    if (!target) return;
    createMutation.mutate(target);
  };

  return (
    <article className="absolute inset-0 z-10 grid place-items-center">
      <div className="bg-white/80 p-10 rounded-xl backdrop-blur-md ">
        <h2 className="text-lg text-dark font-semibold">Start A New Goal</h2>
        <p className="text-light mt-2">
          Your next journey is on the horizon, let’s start your next goal!
        </p>
        <div className="bg-white p-8 rounded-xl mt-8 mb-6">
          <GoalSlider onChange={setTarget} defaultValue={DEFAULT_POINTS} />
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-2"
            onClick={handleCreateGoal}
            isLoading={createMutation.isLoading}
            disabled={target === 0}
          >
            Set Goal
          </Button>
        </div>
      </div>
    </article>
  );
}
