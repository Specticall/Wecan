import useGoalMutation from "@/hooks/useGoalMutation";
import { ACCENT_GRADIENT } from "@/lib/config";
import { cn, formatDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

// Displays the user's main point goal
export default function GoalCard({ className }: { className?: string }) {
  const { goalData } = useGoalMutation();

  return (
    <div
      className={cn(
        "grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] p-8 rounded-2xl mt-8",
        className
      )}
      style={{ background: ACCENT_GRADIENT }}
    >
      <p className="bg-white text-dark rounded-full px-4 py-1 w-fit">
        {goalData?.status === "Completed" ? "Completed" : "On Progress"}
      </p>
      <i className="bx bx-trophy text-[2rem] text-white"></i>
      <div className="mt-12">
        {goalData ? (
          <h3 className="text-lg text-white mb-1">
            {goalData?.target.toLocaleString("de-DE")} Point Goal
          </h3>
        ) : (
          <Skeleton height={"1.5rem"} className="mb-4" />
        )}
        <p className="text-lightest">Started {formatDate(new Date())}</p>
      </div>
    </div>
  );
}
