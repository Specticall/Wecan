import { ScrollArea } from "@/components/ui/scrollable";
import TaskCard from "./TaskCard";
import useTaskMutation from "@/hooks/useTaskMutation";
import { Skeleton } from "@/components/general/Skeleton";
import { TUserTask } from "@/types/general";
type TGroupedTask = {
  onGoing: TUserTask[];
  completed: TUserTask[];
};

function groupTaskByStatus(task?: TUserTask[]) {
  if (!task) return undefined;

  return task.reduce(
    (grouped: TGroupedTask, task) => {
      if (task.status === "OnGoing") {
        grouped.onGoing.push(task);
        return grouped;
      }

      grouped.completed.push(task);
      return grouped;
    },
    {
      onGoing: [],
      completed: [],
    }
  );
}

export default function AcceptedTask() {
  const { taskQuery } = useTaskMutation();
  const groupedTask = groupTaskByStatus(taskQuery.data);
  return (
    <ScrollArea className="bg-white-soft rounded-xl h-0 min-h-full dotted-grid">
      <Skeleton isLoading={!groupedTask}>
        {groupedTask && (
          <div className="grid grid-cols-2 gap-12 px-12">
            <ul className=" flex flex-col gap-12 py-12">
              <CategoryIndicator
                count={groupedTask.onGoing.length}
                text="On Going"
              />
              {groupedTask.onGoing.map((task) => {
                return <TaskCard task={task} key={task.id} />;
              })}
            </ul>
            <ul className=" flex flex-col gap-12 py-12">
              <CategoryIndicator
                count={groupedTask.completed.length}
                text="Completed"
              />
              {groupedTask.completed.map((task) => {
                return <TaskCard task={task} key={task.id} />;
              })}
            </ul>
          </div>
        )}
      </Skeleton>
    </ScrollArea>
  );
}

function CategoryIndicator({ count, text }: { count: number; text: string }) {
  return (
    <p className="text-light flex items-center justify-start gap-3 text-[1rem] mb-[-1.5rem]">
      {text}
      <div className="text-dark bg-white-soft p-2 rounded-md border-[1px] border-border w-6 h-6 flex items-center justify-center">
        {count}
      </div>
    </p>
  );
}
