import ProgressBar from "@/components/general/ProgressBar";
import useGoalMutation from "@/hooks/useGoalMutation";
import { ACCENT_GRADIENT } from "@/lib/config";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

// Dashboard card that tells how many points the user has earned /  needs to earn
export default function EarnedPoints() {
  const { goalData } = useGoalMutation();

  // The point a user needs to earn to complete their goal
  const target = goalData?.target;

  // The point a user has earned in order to compelte their goal
  const earned = goalData?.earned;

  return (
    <article
      className={cn("bg-white rounded-xl p-8 3xl:order-3")}
      style={{
        background: ACCENT_GRADIENT,
      }}
    >
      <div className="flex justify-between items-center mb-8 sm:flex-col-reverse sm:items-start">
        <div>
          <p className="text-white">Wellness Points Earned</p>
          <h3 className="text-xl font-semibold text-white">
            {!target && target !== 0 ? (
              <Skeleton />
            ) : (
              <>{earned?.toLocaleString("de-DE")} points</>
            )}
          </h3>
        </div>
        <i className="bx bx-coin-stack text-xl p-4 rounded-lg sm:mb-4 text-accent bg-white"></i>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-lg ml-auto text-white">
            {goalData ? (
              <>{`${goalData.completionPercent}%`}</>
            ) : (
              <Skeleton className="h-8 w-16" />
            )}
          </p>
        </div>
        <ProgressBar
          variant="dark"
          progressPercent={goalData?.completionPercent}
        />
        <div className="flex justify-between items-center mt-4 text-light text-[0.75rem] ">
          <p className="text-[1rem] text-white">Your Progress</p>
          <p className="text-[1rem] text-white">
            {!target && target !== 0 ? (
              <Skeleton className="w-24 h-4" />
            ) : (
              <>{target?.toLocaleString("de-DE")} Points</>
            )}
          </p>
        </div>
      </div>{" "}
    </article>
  );
}
