import { TMood } from "@/context/MoodContext";
import useTaskDetail from "@/hooks/useTaskDetail";
import { cn, getMoodColor } from "@/lib/utils";
import { TUserTask } from "@/types/general";

type TaskCardProps = {
  task: TUserTask;
};

// Displays any ongoing tasks for the dashboard
export default function OnGoingTaskCard({ task }: TaskCardProps) {
  const { handleOpenDetailDialog, isDeleting } = useTaskDetail({ task });

  const isOnGoing = task.status === "OnGoing";

  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 2xl:p-6 grid-rows-[12rem_4rem] 3xl:grid-rows-[11rem_4rem] gap-x-4 hover:scale-[97.5%] trasition-all duration-200 cursor-pointer sm:flex sm:flex-col",
        isDeleting && "opacity-50"
      )}
      onClick={handleOpenDetailDialog}
    >
      <div
        className="row-span-3 w-2 h-2 rounded-full mt-3 sm:mb-6"
        style={{ background: getMoodColor(task.mood as TMood) }}
      ></div>
      <div className="overflow-hidden">
        <h3 className="text-md">{task.title}.</h3>
        <p className="text-lighter mt-6 leading-[175%] line-clamp-3 sm:mb-10">
          {task.description}
        </p>
      </div>
      {isOnGoing ? (
        <div className="text-lighter">
          <p className="mb-2">On Completion</p>
          <div className="bg-accent px-4 py-1 text-white w-fit rounded-full">
            +{task.points} Points
          </div>
        </div>
      ) : (
        <div className="flex items-end ">
          <div className="bg-white-soft rounded-full px-4 py-1">Completed</div>
        </div>
      )}
    </article>
  );
}
