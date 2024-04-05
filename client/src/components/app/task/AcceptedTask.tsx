import { ScrollArea } from "@/components/ui/scrollable";
import TaskCard from "./TaskCard";
import { Tooltip } from "@/components/general/Tooltip";
import { getMoodColor } from "@/lib/utils";

const dummy = [
  {
    id: "ecstatic-task-1",
    title: "Take a stroll outside your house",
    points: 2500,
    description:
      "Going for a leisurely walk is a great way to ease your mind of any stress accumulated from work or tasks.",
    mood: "Happy",
  },
  {
    id: "ecstatic-task-2",
    title: "Try a new recipe",
    points: 3000,
    description:
      "Cooking a new dish can be a fun and rewarding experience, especially when you're feeling ecstatic.",
    mood: "Ecstatic",
  },
  {
    id: "ecstatic-task-3",
    title: "Have a dance party",
    points: 2000,
    description:
      "Put on your favorite music and dance like nobody's watching to celebrate your ecstatic mood.",
    mood: "Neutral",
  },
];

export default function AcceptedTask() {
  const acceptedTask = dummy;
  return (
    <div className="pr-8">
      <Tooltip
        text="Accepted Task"
        count={acceptedTask.length}
        className="mb-4"
      />
      <ul className="rounded-md border-[1px] border-lighter">
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className=" flex flex-col gap-8 py-8">
            {acceptedTask.map((task) => {
              return (
                <li className="px-8">
                  <TaskCard
                    badgeColor={getMoodColor(task.mood)}
                    task={task}
                    className="shadow-xl shadow-accent/5"
                  />
                </li>
              );
            })}
          </div>
        </ScrollArea>
      </ul>
    </div>
  );
}
