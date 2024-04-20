import Checkbox from "@/components/general/Checkbox";
import { ScrollArea } from "@/components/ui/scrollable";
import { TGoal } from "@/types/general";

const goalHistory: TGoal[] = [
  {
    target: 500000,
    earned: 500000,
    createdAt: Date.now().toLocaleString(),
    id: "190428023984",
    status: "Completed",
    userId: "23094830942",
  },
  {
    target: 500000,
    earned: 500000,
    createdAt: Date.now().toLocaleString(),
    id: "190428023984",
    status: "Completed",
    userId: "23094830942",
  },
  {
    target: 500000,
    earned: 500000,
    createdAt: Date.now().toLocaleString(),
    id: "190428023984",
    status: "Completed",
    userId: "23094830942",
  },
  {
    target: 500000,
    earned: 500000,
    createdAt: Date.now().toLocaleString(),
    id: "190428023984",
    status: "Completed",
    userId: "23094830942",
  },
];

export default function GoalHistory() {
  return (
    <article className="p-8 bg-white rounded-2xl mt-4">
      <h3 className="text-lg text-dark">History</h3>
      <p className="text-light leading-md mt-3">
        Goals you have completed will be displayed here, you can also go back
        and view its stats
      </p>
      <ScrollArea className="mt-6 h-[12.5rem]">
        {goalHistory.map((goal) => {
          return (
            <li className="py-6 border-t-[1px] border-slate-100 flex gap-4 hover:bg-slate-50 transition-all duration-200 cursor-pointer">
              <Checkbox size="sm" />
              <h4 className="text-dark flex-1">
                {goal.target.toLocaleString("de-DE")} Points Goal
              </h4>
              <p className="text-light">Completed At 31 April, 2099</p>
            </li>
          );
        })}
      </ScrollArea>
    </article>
  );
}
