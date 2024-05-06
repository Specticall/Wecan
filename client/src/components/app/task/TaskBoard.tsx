import { ScrollArea } from "@/components/ui/scrollable";
import TaskCard from "./TaskCard";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TUserTask } from "@/types/general";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useViewport } from "@/context/ViewportContext";
import Skeleton from "react-loading-skeleton";
import DesktopTaskBoard from "./DesktopTaskBoard";
import { CategoryIndicator } from "../../general/CategoryIndicator";
import MobileTaskBoard from "./MobileTaskBoard";
export type TGroupedTask = {
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
      <div
        className={cn(
          "grid grid-cols-2 gap-12 px-12 3xl:px-8 3xl:gap-8 sm:px-0",
          params.status && "grid-cols-1"
        )}
      >
        {groupedTask ? (
          <>
            {/* Render the complete task board if param do status is empty (this means all tasks) */}
            {!params.status ? (
              <DesktopTaskBoard groupedTask={groupedTask} />
            ) : (
              // Only render a specific task status if the user has selected either "ongoing" or "completed" as their parameter
              <MobileTaskBoard
                groupedTask={groupedTask}
                status={params.status === "ongoing" ? "onGoing" : "completed"}
              />
            )}{" "}
          </>
        ) : (
          <div className="col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-12 py-12 3xl:py-8 3xl:gap-8">
            {new Array(4).fill(0).map((_, i) => {
              return <Skeleton key={i} height={"20rem"} />;
            })}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
