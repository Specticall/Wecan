import { ScrollArea } from "@/components/ui/scrollable";
import TaskCard from "./TaskCard";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TUserTask } from "@/types/general";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useViewport } from "@/context/ViewportContext";
type TGroupedTask = {
  onGoing: TUserTask[];
  completed: TUserTask[];
};

// Converts a list of tasks into a grouped object with two keys: "onGoing" and "completed"
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

// Make sures a URL param is either empty, "ongoing" or "completed". This is mostly used for mobile version of the appliaction where we can't fit two columns of tasks. As such, on smaller screens the user is only shown either ongoing tasks or completed at a time.
const validateURLParams = (param: Params<string>) => {
  const isEmpty = JSON.stringify(param) === "{}";
  const isOnGoing = param.status === "ongoing";
  const isCompleted = param.status === "completed";
  if (isEmpty || isOnGoing || isCompleted) return true;
  return false;
};

export default function TaskBoard() {
  const { taskQuery } = useTaskMutation();
  const groupedTask = groupTaskByStatus(taskQuery.data);
  const { pathname } = useLocation();
  const { type } = useViewport();
  const params = useParams();
  const navigate = useNavigate();

  // If the user in using a large screen and their currently viewing a singular task status (either ongoing or completed), redirect them to the board where there exist 2 columns.
  useEffect(() => {
    if (type === "3xl" || type === "2xl") return;
    if (pathname === "/app/task/board") navigate("/app/task/board/ongoing");
  }, [type, pathname, navigate]);

  const isValidURLParams = validateURLParams(params);

  // Navigate to /ongoing by default if the URL params are invalid
  useEffect(() => {
    if (!isValidURLParams) {
      navigate("/app/task/board/ongoing");
    }
  }, [navigate, isValidURLParams]);

  if (!isValidURLParams) return;
  return (
    <ScrollArea className="bg-white-soft rounded-xl h-0 min-h-full dotted-grid 2xl:min-h-[40rem] 2xl:h-full 2xl:max-h-[30rem] sm:p-4 md:min-h-[30rem]">
      {groupedTask && (
        <div
          className={cn(
            "grid grid-cols-2 gap-12 px-12 3xl:px-8 3xl:gap-8 sm:px-0",
            params.status && "grid-cols-1"
          )}
        >
          {!params.status ? (
            <>
              <ul className=" flex flex-col gap-12 py-12 3xl:py-8 3xl:gap-8">
                <CategoryIndicator
                  count={groupedTask.onGoing.length}
                  text="On Going"
                />
                {groupedTask.onGoing.map((task) => {
                  return <TaskCard task={task} key={task.id} />;
                })}
              </ul>
              <ul className=" flex flex-col gap-12 py-12  3xl:py-8 3xl:gap-8">
                <CategoryIndicator
                  count={groupedTask.completed.length}
                  text="Completed"
                />
                {groupedTask.completed.map((task) => {
                  return <TaskCard task={task} key={task.id} />;
                })}
              </ul>
            </>
          ) : (
            <ul className=" flex flex-col gap-12 py-12  3xl:py-8 3xl:gap-8">
              <CategoryIndicator
                count={
                  groupedTask[
                    params.status === "ongoing" ? "onGoing" : "completed"
                  ].length
                }
                text={params.status === "ongoing" ? "On Going" : "Completed"}
              />
              {groupedTask[
                params.status === "ongoing" ? "onGoing" : "completed"
              ].map((task) => {
                return <TaskCard task={task} key={task.id} />;
              })}
            </ul>
          )}
        </div>
      )}
    </ScrollArea>
  );
}

function CategoryIndicator({ count, text }: { count: number; text: string }) {
  return (
    <p className="text-light flex items-center justify-start gap-3 text-[1rem] mb-[-1.5rem] 3xl:mb-0">
      {text}
      <div className="text-dark bg-white-soft p-2 rounded-md border-[1px] border-border w-6 h-6 flex items-center justify-center">
        {count}
      </div>
    </p>
  );
}
