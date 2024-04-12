import TaskCard from "../task/TaskCard";
import Button from "@/components/general/Button";
import useTaskMutation from "@/hooks/useTaskMutation";

export default function OnGoingTask() {
  const { userTask } = useTaskMutation();

  const onGoingTask = userTask
    ? userTask.find((task) => task.status === "OnGoing")
    : undefined;

  return (
    <article className="px-10 pt-8 pb-4 bg-accent rounded-md flex-1">
      <div className="flex gap text-lightest mb-6 items-start justify-between">
        <div className="flex gap-2 items-center justify-center">
          <i className="bx bx-calendar-check text-md"></i>
          <p>On Going Task</p>
        </div>
        <Button
          className="text-lightest underline hover:text-white cursor-pointer p-0"
          to="/app/task"
        >
          Get More
        </Button>
      </div>
      <div className="shadow-lg relative w-full isolate">
        {onGoingTask ? (
          <TaskCard
            task={onGoingTask}
            enableCompleteButton
            className="z-[3] relative"
          />
        ) : (
          <div className=" relative bg-white p-8 rounded-md hover:scale-[97.5%] transition-all duration-200 cursor-pointer z-[3] py-12">
            <h2 className="text-lg text-center ">
              You have no on going tasks!
            </h2>
            <p className="text-center mt-1 text-lighter">
              Complete tasks and earn wellness points
            </p>
            <div className="flex items-center justify-center">
              <Button className="shadow-none px-12 mt-8" to="/app/task">
                Get Task
              </Button>
            </div>
          </div>
        )}
        <div className="bg-slate-200 inset-0 translate-y-4 absolute z-[2] rounded-md scale-[97.5%] card-2 transition-all duration-100"></div>
        <div className="bg-slate-300 inset-0 translate-y-7 absolute rounded-md scale-[95%] z-[1] card-3"></div>
      </div>
      <div className="flex items-center justify-center gap-2 text-lightest mt-12">
        <i className="bx bx-chevron-down text-md"></i>
        <p>Next</p>
      </div>
    </article>
  );
}
