import { TMood } from "@/context/MoodContext";
import useTaskDetail from "@/hooks/useTaskDetail";
import { cn, formatDate, getMoodColor } from "@/lib/utils";
import { TUserTask } from "@/types/general";

// Table task item
export default function TaskItem({ task }: { task: TUserTask }) {
  const { handleDelete, handleOpenDetailDialog, isDeleting } = useTaskDetail({
    task,
  });

  return (
    <div
      className={cn(
        "grid grid-cols-[5fr_4fr_2fr_3fr_1fr] py-5 bg-white rounded-md px-8 gap-12 items-center hover:bg-slate-50 transition-all duration-100 cursor-pointer 3xl:px-4 3xl:gap-6",
        isDeleting && "opacity-60"
      )}
      onClick={handleOpenDetailDialog}
    >
      <h3 className="text-light flex items-center gap-4 overflow-hidden">
        {/* Title */}

        <div
          className="w-2 aspect-square rounded-full 3xl:hidden"
          style={{ backgroundColor: getMoodColor(task.mood as TMood) }}
        ></div>
        <p className="truncate">{task.title}</p>
      </h3>
      {/* Date */}
      <div>
        <p>
          {task.status === "Completed"
            ? formatDate(new Date(task.createdAt))
            : "-"}
        </p>
      </div>
      {/* Points */}
      <p>{task.points.toLocaleString("de-DE")}</p>

      {/* Status */}
      <div className="">
        <p
          className={cn(
            "text-white py-1 w-fit rounded-full px-4",
            task.status === "Completed" ? "text-dark bg-slate-100" : "bg-accent"
          )}
        >
          {task.status}
        </p>
      </div>

      {/* Delete Button */}
      {task.status === "OnGoing" ? (
        <i
          className="bx bx-trash text-md text-lighter cursor-pointer hover:text-dark"
          onClick={handleDelete}
        ></i>
      ) : (
        <div></div>
      )}
    </div>
  );
}
