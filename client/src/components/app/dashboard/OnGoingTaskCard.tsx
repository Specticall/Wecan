import { TMood } from "@/context/MoodContext";
import useTaskDetail from "@/hooks/useTaskDetail";
import { cn, getMoodColor } from "@/lib/utils";
import { TUserTask } from "@/types/general";

// Task card used to display the user's current on going task
// This component is only used in the dashboard, for the ones showed in /task is an entirely different component
export default function OnGoingTaskCard({ task }: { task: TUserTask }) {
  const { handleOpenDetailDialog, isDeleting } = useTaskDetail({ task });

  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 grid-rows-[12rem_4rem] gap-x-4 hover:scale-[97.5%] trasition-all duration-200 cursor-pointer sm:flex sm:flex-col",
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
      <div className="text-lighter">
        <p className="mb-2">On Completion</p>
        <div className="bg-accent px-4 py-1 text-white w-fit rounded-full">
          +{task.points} Points
        </div>
      </div>
    </article>
  );
}
