import Button from "@/components/general/Button";
import { TTask } from "@/context/TaskContext";
import { cn } from "@/lib/utils";

export default function TaskCard({
  task,
  className,
  badgeColor,
  enableCompleteButton,
}: {
  task?: TTask;
  className?: string;
  badgeColor?: string;
  enableCompleteButton?: boolean;
}) {
  return (
    <article className={cn("bg-white p-8 rounded-md", className)}>
      <div className="flex gap-6 justify-between items-center">
        <h2 className="text-md">{task?.title}.</h2>
        <div className="flex flex-col items-center justify-center whitespace-nowrap">
          <p className="text-light text mb-1">On Completion</p>
          <p
            className="bg-dark px-4 py-[2px] rounded-full text-lightest"
            style={badgeColor ? { backgroundColor: badgeColor } : undefined}
          >
            + {task?.points} pts
          </p>
        </div>
      </div>
      <p className="mt-8 text-light">{task?.description}</p>
      {enableCompleteButton && (
        <Button className="py-2 flex items-center justify-center gap-2 mt-5">
          Complete <i className="text-md bx bx-check"></i>
        </Button>
      )}
    </article>
  );
}
