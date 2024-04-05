import { taskData } from "@/data/dummyTasksEndpoint";
import TaskCard from "../task/TaskCard";

export default function OnGoingTask() {
  return (
    <article className="px-10 pt-8 pb-4 bg-accent rounded-md flex-1">
      <div className="flex gap text-lightest mb-6 items-start justify-between">
        <div className="flex gap-2 items-center justify-center">
          <i className="bx bx-calendar-check text-md"></i>
          <p>On Going Task</p>
        </div>
        <p className="text-lightest underline hover:text-white cursor-pointer">
          Get More
        </p>
      </div>
      <div className="shadow-lg relative w-full isolate">
        <TaskCard
          task={taskData.Ecstatic[0]}
          enableCompleteButton
          className="z-[3] relative"
        />
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
