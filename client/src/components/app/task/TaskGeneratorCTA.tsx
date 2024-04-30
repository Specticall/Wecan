import Button from "@/components/general/Button";
import useTaskGenerator from "@/hooks/useTaskGenerator";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TTaskRequest } from "@/types/general";
import { useRef } from "react";

export default function TaskGeneratorCTA({
  setShuffling,
  hasCompletedGoal = false,
}: {
  setShuffling: React.Dispatch<React.SetStateAction<boolean>>;
  hasCompletedGoal?: boolean;
}) {
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();
  const { addMutation } = useTaskMutation();
  const timer = useRef<NodeJS.Timeout | undefined>();

  const shuffleTask = () => {
    clearTimeout(timer.current);

    setShuffling(true);

    timer.current = setTimeout(() => {
      setShuffling(false);
    }, 1000);

    generatedTaskQuery.refetch();
  };

  const handleAddTask = () => {
    if (!generatedTask) return;

    const newTask = {
      title: generatedTask.title,
      description: generatedTask.description,
      mood: generatedTask.mood,
      status: "OnGoing",
      points: generatedTask.points,
    } satisfies TTaskRequest;

    addMutation.mutate(newTask);
    shuffleTask();
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-6 sm:mt-0">
      <Button
        disabled={addMutation.isLoading || hasCompletedGoal}
        className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200 bg-darkest shadow-black/120"
        onClick={shuffleTask}
      >
        <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative">
          <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
          <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
        </div>
        Shuffle
      </Button>
      <Button
        disabled={addMutation.isLoading || hasCompletedGoal}
        className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200"
        onClick={handleAddTask}
      >
        <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative">
          <i className="bx bx-plus  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
          <i className="bx bx-plus  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
        </div>
        Add Task
      </Button>
    </div>
  );
}
