import ProgressBar from "@/components/general/ProgressBar";
import useGoalMutation from "@/hooks/useGoalMutation";
import { ACCENT_GRADIENT } from "@/lib/config";
import Skeleton from "react-loading-skeleton";

export default function TaskProgressBanner() {
  const { goalData, progressPercent } = useGoalMutation();

  const pointsToGo = goalData && goalData.target - goalData.earned;
  const hasCompletedGoal = pointsToGo && pointsToGo > 0;
  return (
    <article
      className="bg-white mt-4 rounded-lg p-8"
      style={{
        background: ACCENT_GRADIENT,
      }}
    >
      <div className="flex items-center justify-between gap-4 sm:flex-col-reverse sm:items-start">
        {
          <h3 className="text-lg text-white font-semibold">
            {hasCompletedGoal ? (
              <>
                You Have{" "}
                {goalData && pointsToGo ? (
                  <span>{pointsToGo.toLocaleString("de-DE")}</span>
                ) : (
                  <Skeleton height={"1.5rem"} width={"7rem"} className="ml-4" />
                )}{" "}
                Points To Go!
              </>
            ) : (
              "You Have Completed Your Goal!"
            )}
          </h3>
        }
        <div className="whitespace-nowrap rounded-full px-6 py-2 bg-white-soft">
          Your Progress
        </div>
      </div>
      <p className="mt-4 text-white mb-8">
        {hasCompletedGoal
          ? "You’re on your way to complete your goal, Keep going!"
          : "Congratulaions on completing your goal, don't forget to check your results"}
      </p>
      <ProgressBar progressPercent={progressPercent} variant={"dark"} />
      <div className="flex justify-between items-center gap-4 mt-2 text-white">
        {goalData ? (
          <>
            <p>{goalData.earned.toLocaleString("de-DE")} Points</p>
            <p>{goalData.target.toLocaleString("de-DE")} Points</p>
          </>
        ) : (
          <>
            <Skeleton height={"1rem"} width={"5rem"} />
            <Skeleton height={"1rem"} width={"5rem"} />
          </>
        )}
      </div>
    </article>
  );
}
