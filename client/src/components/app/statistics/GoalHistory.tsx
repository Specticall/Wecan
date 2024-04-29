import Checkbox from "@/components/general/Checkbox";
import { ScrollArea } from "@/components/ui/scrollable";
import useGoalMutation from "@/hooks/useGoalMutation";
import { formatDate, toReversed } from "@/lib/utils";
import { TGoal } from "@/types/general";

export default function GoalHistory() {
  const { allGoalData } = useGoalMutation();

  console.log(allGoalData && toReversed(allGoalData));

  return (
    <article className=" bg-white rounded-2xl mt-4">
      <div className="px-8 pt-8">
        <h3 className="text-lg text-dark">History</h3>
        <p className="text-light leading-md mt-3">
          Goals you have completed will be displayed here, you can also go back
          and view its stats
        </p>
      </div>
      <ScrollArea className="mt-6 h-[12.5rem]">
        {allGoalData &&
          toReversed(allGoalData).map((goal) => {
            return (
              <li className="py-6 border-t-[1px] border-slate-100 flex gap-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer px-8">
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
      </ScrollArea>
    </article>
  );
}
