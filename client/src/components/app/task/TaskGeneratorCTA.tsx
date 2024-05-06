import Button from "@/components/general/Button";
import useTaskGenerator from "@/hooks/useTaskGenerator";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TTaskRequest } from "@/types/general";
import { useRef } from "react";

/*
Task generator's call to action buttons. This component is responsible for shuffling the task and adding the task to the user's task list.
*/
export default function TaskGeneratorCTA({
  setShuffling,
  hasCompletedGoal = false,
}: {
  setShuffling: React.Dispatch<React.SetStateAction<boolean>>;
  hasCompletedGoal?: boolean;
}) {
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();
  const { addMutation } = useTaskMutation();

  // We're storing a timer reference on this ref
  const timer = useRef<NodeJS.Timeout | undefined>();

  /**
   * This task creates a imaginary timer then calls the shuffleTask function to refetch the generated task. This imaginary timer is used to ensure the shuffle animation is visible to the user. (When a requests happens too fast, the shuffle button doesn't look like it's doing anything)
   *
   */
  const shuffleTask = () => {
    // Clear the previous timer if it exists. This is done to prevent race conditions where the previous timer is still running and the new timer is created.
    clearTimeout(timer.current);

    setShuffling(true);

    // Queue a function that will set the shuffling state to false after 1000ms / 1s has passed.
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
    <div className="flex items-center justify-center mt-4 gap-6 sm:mt-0 md:flex-col md:gap-4">
      <Button
        disabled={addMutation.isLoading || hasCompletedGoal}
        className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200 bg-darkest shadow-black/120 md:w-full md:py-3"
        onClick={shuffleTask}
      >
        <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative md:hidden">
          <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
          <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
        </div>
        Shuffle
      </Button>
      <Button
        disabled={addMutation.isLoading || hasCompletedGoal}
        className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200 md:w-full md:py-3"
        onClick={handleAddTask}
      >
        <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative md:hidden">
          <i className="bx bx-plus  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
          <i className="bx bx-plus  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
        </div>
        Add Task
      </Button>
    </div>
  );
}
