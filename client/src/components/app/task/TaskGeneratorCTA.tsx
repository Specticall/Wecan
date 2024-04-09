import Button from "@/components/general/Button";
import useTaskGenerator from "@/hooks/useTaskGenerator";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TTaskRequest } from "@/types/general";

export default function TaskGeneratorCTA() {
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();
  const { addMutation } = useTaskMutation();

  const shuffleTask = () => {
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
    <div className="flex items-center justify-center mt-8 gap-6">
      <Button
        disabled={addMutation.isLoading}
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
        disabled={addMutation.isLoading}
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
