import Button from "@/components/general/Button";
import useTaskMutation from "@/hooks/useTaskMutation";
import { useNavigate } from "react-router-dom";
import OnGoingTaskCard from "./OnGoingTaskCard";
import { cn } from "@/lib/utils";

export default function OnGoingTask() {
  const { userTask } = useTaskMutation();
  const navigate = useNavigate();

  const onGoingTask = userTask
    ? userTask.filter((task) => task.status === "OnGoing")
    : undefined;

  const onGoingTaskExist = onGoingTask ? onGoingTask?.length > 0 : false;

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
          onClick={() => navigate("/app/task/all")}
        >
          View All
          <i className="bx bx-chevron-right text-md"></i>
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
        {onGoingTaskExist ? (
          onGoingTask?.slice(0, 2).map((task) => {
            return <OnGoingTaskCard task={task} />;
          })
        ) : (
          <article
            className={cn(
              "grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 grid-rows-[12rem_auto] gap-x-4 hover:scale-[97.5%] trasition-all duration-200 cursor-pointer"
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
              onClick={() => navigate("/app/task/generator")}
            >
              Get Task
            </Button>
          </article>
        )}
      </div>
    </article>
  );
}
