import Button from "@/components/general/Button";
import useTaskDetail from "@/hooks/useTaskDetail";
import { cn } from "@/lib/utils";
import { TTask } from "@/types/general";

export default function TaskCard({
  task,
  className,
  badgeColor,
  enableCompleteButton,
  onDelete = () => {},
  onComplete = () => {},
}: {
  task?: TTask;
  className?: string;
  badgeColor?: string;
  enableCompleteButton?: boolean;
  onDelete?: () => void;
  onComplete?: (taskId: string) => void;
}) {
  const { handleDelete, handleOpenDetailDialog, isDeleting } = useTaskDetail({
    task,
  });

  return (
    <article
      className={cn(
        "bg-white p-8 rounded-md hover:scale-[97.5%] transition-all duration-200 cursor-pointer",
        className,
        isDeleting && "opacity-50"
      )}
      onClick={(e) => handleOpenDetailDialog(e)}
    >
      <div className="flex gap-6 justify-between items-center">
        <div>
          <h2 className="text-md">{task?.title}.</h2>
          <div className="flex items-center justify-start whitespace-nowrap mt-2 gap-3">
            <p
              className="bg-dark px-4 py-[2px] rounded-full text-lightest"
              style={badgeColor ? { backgroundColor: badgeColor } : undefined}
            >
              + {task?.points} pts
            </p>
            <p className="text-light text">On Completion</p>
          </div>
        </div>
        <i
          className="text-md bx bx-trash text-lighter hover:text-dark cursor-pointer transition-all duration-200 self-start mt-2"
          onClick={() => {
            onDelete();
            handleDelete();
          }}
        ></i>
      </div>
      <p className="mt-8 text-light">{task?.description}</p>
      {enableCompleteButton && (
        <Button
          className="py-2 flex items-center justify-center gap-2 mt-5"
          onClick={() => {
            if (!task?.id) return;
            onComplete(task.id);
          }}
        >
          Complete <i className="text-md bx bx-check"></i>
        </Button>
      )}
    </article>
  );
}
