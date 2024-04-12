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
    <div className="pr-8">
      <Skeleton isLoading={!onGoingTask}>
        {onGoingTask && (
          <Tooltip
            text="Accepted Task"
            count={onGoingTask.length}
            className="mb-4"
          />
        )}
      </Skeleton>

      <ul className="rounded-md border-[1px] border-lighter">
        <ScrollArea className="h-[calc(100vh-12rem)]">
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
      </ul>
    </div>
  );
}
