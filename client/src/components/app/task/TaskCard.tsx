import Button from "@/components/general/Button";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { cn } from "@/lib/utils";
import { TTask } from "@/types/general";
import { MouseEvent, useEffect, useState } from "react";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteMutation } = useTaskMutation();

  const { showDialog } = useGlobalDialog();

  const handleDelete = () => {
    if (!task?.id) return;
    deleteMutation.mutate(task.id);
    setIsDeleting(true);
  };

  const handleOpenDetailDialog = (e: MouseEvent) => {
    console.log((e.target as HTMLDivElement).classList);
    if ((e.target as HTMLDivElement).classList.contains("bx-trash")) return;
    showDialog("taskDetail", task);
  };

  useEffect(() => {
    if (deleteMutation.status === "error") setIsDeleting(false);
  }, [deleteMutation.status]);

  return (
    <article
      className={cn(
        "bg-white p-8 rounded-md hover:scale-[97.5%] transition-all duration-200 cursor-pointer",
        className,
        isDeleting && "opacity-50"
      )}
      onClick={handleOpenDetailDialog}
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
