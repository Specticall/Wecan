import Button from "@/components/general/Button";
import useTaskMutation from "@/hooks/useTaskMutation";
import { useNavigate } from "react-router-dom";
import OnGoingTaskCard from "./OnGoingTaskCard";
import { cn } from "@/lib/utils";
import { useViewport } from "@/context/ViewportContext";
import useGoalMutation from "@/hooks/useGoalMutation";
import Suspend from "@/components/general/SkeletonWrapper";
import Skeleton from "react-loading-skeleton";

// Shows a preview of the user's current on going task,allowing for an easy access
export default function OnGoingTask() {
  const { userTask } = useTaskMutation();
  const { goalData } = useGoalMutation();
  const navigate = useNavigate();
  const { type } = useViewport();

  const onGoingTask = userTask
    ? userTask.filter((task) => task.status === "OnGoing")
    : undefined;

  const onGoingTaskExist = onGoingTask ? onGoingTask?.length > 0 : false;

  // Do not show this component if goal has been completed (because use can't create a new one)
  if (goalData && goalData?.status === "Completed") return;
  return (
    <article className="bg-white-soft mt-4 p-10 rounded-xl flex-1 md:px-4 md:py-6">
      <header className="mb-8 flex justify-between items-center gap-6 md:flex-col md:items-start">
        <div>
          <h2 className="text-lg text-darkest flex items-center justify-start gap-2 sm:flex-col sm:items-start sm:gap-3">
            <i className="bx bx-clipboard text-[2rem] text-dark "></i>
            Your On Going Tasks
          </h2>
          <p className="text-lighter mt-2 leading-[150%] md:mt-4">
            {onGoingTaskExist
              ? "Looks like you've got things to do, what are you waiting for?"
              : "Looks like you've got no task right now"}
          </p>
        </div>
        <Button
          variant="clean"
          className="bg-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-border whitespace-nowrap"
          onClick={() => {
            if (type === "2xl" || type === "3xl" || type === "xl") {
              navigate("/app/task/board");
            } else {
              navigate("/app/task/board/onboarding");
            }
          }}
        >
          View All
          <i className="bx bx-chevron-right text-md"></i>
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
        <Suspend
          fallback={
            <>
              {new Array(2).fill(0).map((_, index) => (
                <Skeleton
                  height="20rem"
                  width="100%"
                  className="mt-4"
                  key={index}
                />
              ))}
            </>
          }
          renderFallback={!userTask || !goalData}
        >
          {onGoingTaskExist ? (
            onGoingTask?.slice(0, 2).map((task) => {
              return <OnGoingTaskCard task={task} />;
            })
          ) : (
            <article
              className={cn(
                "grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 grid-rows-[12rem_auto] gap-x-4 trasition-all duration-200 cursor-pointer"
              )}
            >
              <div className="bg-accent row-span-3 w-2 h-2 rounded-full mt-3"></div>
              <div className="overflow-hidden">
                <h3 className="text-md">Get Your Task</h3>
                <p className="text-lighter mt-6 leading-[175%] line-clamp-3 ">
                  Choose the tasks you want to do and add it to your list!
                </p>
              </div>
              <Button
                className="py-3 px-12 h-fit w-fit shadow-none"
                onClick={() => navigate("/app/task/board")}
              >
                Get Task
              </Button>
            </article>
          )}{" "}
        </Suspend>
      </div>
    </article>
  );
}
