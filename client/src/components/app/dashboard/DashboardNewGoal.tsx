import Button from "@/components/general/Button";
import GoalSlider from "@/components/onboarding/GoalSlider";
import useClaimReward from "@/hooks/useClaimReward";
import useGoalMutation from "@/hooks/useGoalMutation";
import { useState } from "react";

const DEFAULT_POINTS = 150000;

// Goal selector that shows in the dashboard. Allows user to set a new goal once they have completed their current one.
export default function DashboardNewGoal() {
  const { createMutation } = useGoalMutation();
  const { goalData } = useGoalMutation();

  // New target point set as state because we need to pass it into the mutation on load.
  const [target, setTarget] = useState(DEFAULT_POINTS);

  const { claimMutation } = useClaimReward();

  const handleCreateGoal = () => {
    if (!target) return;
    createMutation.mutate(target);
  };

  // If user has not claim a reward yet then show this ui
  if (!goalData?.hasClaimedReward && goalData?.backgroundRewardId)
    return (
      <article className="absolute inset-0 z-10 grid place-items-center">
        <div className="bg-white/80 p-10 rounded-xl backdrop-blur-md text-center max-w-[25rem]">
          <i className="bx bx-gift text-[3rem] bg-accent rounded-full mb-8 p-4 text-white"></i>
          <h2 className="text-lg font-semibold">Claim Your Reward</h2>
          <p className="text-light mt-2 text-center leading-md">
            Great Job! You have successfully reached your goal, we’ve prepared a
            special gift just for you!
          </p>
          <Button
            className="flex gap-2 mx-auto mt-6 relative overflow-hidden"
            disabled={claimMutation.isLoading}
            isLoading={claimMutation.isLoading}
            onClick={() => {
              claimMutation.mutate();
            }}
          >
            <div className="absolute inset-0 shine mix-blend-screen"></div>
            Claim Reward
          </Button>
        </div>
      </article>
    );

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
