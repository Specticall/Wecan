import ProgressBar from "@/components/general/ProgressBar";
import Suspend from "@/components/general/SkeletonWrapper";
import useGoalMutation from "@/hooks/useGoalMutation";
import useHistoryMutation from "@/hooks/useHistoryMutation";
import { ACCENT_GRADIENT } from "@/lib/config";
import { formatNumber } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

// Total point the user has earned on the current goal.
export default function StatisticsTotalPoints() {
  const { goalData, progressPercent } = useGoalMutation();
  const { historyData } = useHistoryMutation();

  const pointsEarnedTodayPercent = historyData?.completionPercent;

  return (
    <article className="grid grid-cols-[1fr_auto] bg-white p-8 rounded-2xl 2xl:mt-4">
      <p className="text-light mb-2">Total Points Earned</p>
      <i
        className="bx bx-coin-stack row-span-2 bg-white-soft text-[2rem] p-4 rounded-xl text-white flex items-center justify-center aspect-square w-18 sm:invisible"
        style={{ background: ACCENT_GRADIENT }}
      ></i>
      <div className="flex items-center justify-start gap-6 md:flex-col md:items-start md:gap-2">
        <Suspend
          fallback={<Skeleton className="h-10 w-64" />}
          renderFallback={!goalData}
        >
          <h2 className="text-xl font-semibold sm:text-[2rem]">
            {goalData?.earned.toLocaleString("de-DE")} Points
          </h2>
          <div className="bg-[#D4D9FF] text-accent py-1 px-3 rounded-lg">
            +{pointsEarnedTodayPercent}% Today
          </div>
        </Suspend>
      </div>
      <ProgressBar
        className="col-span-2 mt-8"
        progressPercent={progressPercent}
      />
      <div className="flex items-center justify-between col-span-2 mt-3">
        <p className="text-light">Your Progress</p>
        <p className="text-light">
          {goalData ? (
            formatNumber(goalData.target)
          ) : (
            <Skeleton width={"5rem"} />
          )}
        </p>
      </div>
    </article>
  );
}
