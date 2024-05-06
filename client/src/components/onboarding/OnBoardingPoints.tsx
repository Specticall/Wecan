import GoalSlider from "./GoalSlider";
import OnboardingNavigation from "./OnBoardingNavigation";
import Button from "../general/Button";
import { useState } from "react";
import useOnboardingPagination from "@/hooks/useOnboardingPagination";
import useGoalMutation from "@/hooks/useGoalMutation";

const DEFAULT_POINTS = 50_000;

export default function OnBoardingPoints() {
  const [points, setPoints] = useState(DEFAULT_POINTS);
  const { nextPage, prevPage } = useOnboardingPagination();
  const { updateMutation, goalData } = useGoalMutation();

  const handleNext = () => {
    updateMutation.mutate(
      {
        target: points,
      },
      {
        onSuccess: () => {
          nextPage();
        },
      }
    );
  };

  return (
    <>
      <OnboardingNavigation />
      <main className="section flex-1 grid place-items-center py-12 gap-12 sm:px-0">
        <article className="flex flex-col items-center justify-center">
          <h1 className="text-xl mb-6 text-center max-w-[35rem] sm:text-[1.75rem]">
            Strive To Achieve As Many
            <span className="text-dark font-semibold"> Wellness Points </span>
            As You Can.
          </h1>
          <p className="text-light leading-[175%] mb-16 text-center max-w-[50rem]">
            Having goals is a good way to motivate yourself to do more.
            <span className="sm:hidden">
              With our wellness points system at Wecan, you can establish goals,
              big or small, and we're here to assist you every step of the way
            </span>
          </p>
          <div className="w-full">
            <p className="text-darkest mb-4">Set Your Wellness Points Goal</p>
            <GoalSlider onChange={setPoints} defaultValue={goalData?.target} />
          </div>
        </article>
      </main>
      <div className="w-full grid grid-cols-[10rem_1fr_10rem] max-w-[1500px] sm:grid-cols-1 sm:p-0 mx-auto px-8 pb-4 mt-16 sm:gap-2">
        <Button variant="tertiary" onClick={prevPage}>
          Previous
        </Button>
        <div></div>
        <Button
          className="shadow-none"
          onClick={handleNext}
          disabled={!points || updateMutation.isLoading}
          isLoading={updateMutation.isLoading}
        >
          Next
        </Button>
      </div>
    </>
  );
}
