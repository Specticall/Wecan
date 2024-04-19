import { ScrollArea } from "@/components/ui/scrollable";
import TaskCard from "./TaskCard";
import { Tooltip } from "@/components/general/Tooltip";
import { getMoodColor } from "@/lib/utils";
import { TMood } from "@/context/MoodContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { Skeleton } from "@/components/general/Skeleton";

export default function AcceptedTask() {
  const { onGoingTask } = useTaskMutation();

  return (
    <ScrollArea className="bg-white-soft rounded-xl h-full">
      <Skeleton isLoading={!onGoingTask}>
        {onGoingTask && (
          <div className=" flex flex-col gap-8 py-8">
            {onGoingTask.map((task) => {
              return (
                <li className="px-8" key={task.id}>
                  <TaskCard
                    badgeColor={getMoodColor(task.mood as TMood)}
                    task={task}
                    className="shadow-xl shadow-accent/5"
                  />
                </li>
              );
            })}
          </div>
        )}
      </Skeleton>
    </ScrollArea>
  );
}
