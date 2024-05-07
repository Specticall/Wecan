import Suspend from "@/components/general/SkeletonWrapper";
import { ScrollArea } from "@/components/ui/scrollable";
import useGoalMutation from "@/hooks/useGoalMutation";
import { formatDate, toReversed } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";

// Displays all goals that the user has completed in the past.
export default function GoalHistory() {
  const { allGoalData } = useGoalMutation();

  return (
    <article className=" bg-white rounded-2xl">
      <div className="px-8 pt-8">
        <h3 className="text-lg text-dark">History</h3>
        <p className="text-light leading-md mt-3">
          Goals you have completed will be displayed here, you can also go back
          and view its stats
        </p>
      </div>
      <ScrollArea className="mt-6 h-[12.5rem]">
        <Suspend
          fallback={
            <div className="px-8">
              {new Array(3).fill(0).map((_, i) => {
                return <Skeleton className="h-8 mb-4" key={i} />;
              })}
            </div>
          }
          renderFallback={!allGoalData}
        >
          {allGoalData &&
            toReversed(allGoalData).map((goal) => {
              return (
                <li
                  className="py-6 border-t-[1px] border-slate-100 flex gap-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer px-8"
                  key={goal.id}
                >
                  <h4 className="text-dark flex-1">
                    {goal.target.toLocaleString("de-DE")} Points Goal
                  </h4>
                  {goal.completedAt ? (
                    <p className="text-light">
                      Completed {formatDate(new Date(goal.completedAt))}
                    </p>
                  ) : (
                    <div className="bg-accent px-4 py-1 rounded-full text-white">
                      On Going
                    </div>
                  )}
                </li>
              );
            })}
        </Suspend>
      </ScrollArea>
    </article>
  );
}
