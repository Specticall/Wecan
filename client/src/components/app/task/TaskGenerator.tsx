import { useMood } from "@/context/MoodContext";
import CurrentMood from "./CurrentMood";
import { generateTask } from "@/data/dummyTasksEndpoint";
import { useQuery } from "react-query";
import Button from "@/components/general/Button";
import TaskCard from "./TaskCard";
import "@/styles/animation.css";
import { Skeleton } from "@/components/general/Skeleton";
import { getMoodColor } from "@/lib/utils";
import useTaskGenerator from "@/hooks/useTaskGenerator";

export default function TaskGenerator() {
  const { currentMood } = useMood();
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();

  const shuffleTask = () => {
    generatedTaskQuery.refetch();
  };

  return (
    <div className="w-full self-stretch pr-24 flex flex-col">
      <p className="text-lighter mb-4">Task Generator</p>
      <CurrentMood>
        <p className="text-lightest">Generating Task for</p>
        <h2 className="text-md text-white">
          {currentMood ? `${currentMood} Mood` : "All Moods"}
        </h2>
      </CurrentMood>
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
        <article className="shadow-lg relative w-full">
          <Skeleton
            isLoading={
              generatedTaskQuery.isLoading || generatedTaskQuery.isRefetching
            }
            className="h-48"
          >
            <TaskCard task={generatedTask} />
          </Skeleton>
          <div
            className="bg-accent inset-0 translate-y-4 absolute z-[-1] rounded-md scale-[97.5%] card-2 transition-all duration-100"
            style={
              currentMood && { backgroundColor: getMoodColor(currentMood) }
            }
          ></div>
          <div className="bg-slate-300 inset-0 translate-y-7 absolute rounded-md scale-[95%] z-[-2] card-3"></div>
        </article>

        <div className="flex items-center justify-center mt-8 gap-6">
          <Button
            className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200 bg-darkest shadow-black/120"
            onClick={shuffleTask}
          >
            <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative">
              <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
              <i className="bx bx-shuffle  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
            </div>
            Shuffle
          </Button>
          <Button className="h-fit flex gap-6 px-2 py-2 pr-8 items-center justify-center group hover:opacity-80 trasition-all duration-200">
            <div className="bg-white aspect-square h-full flex items-center justify-center p-[0.5rem] rounded-full overflow-hidden relative">
              <i className="bx bx-plus  text-darkest group-hover:translate-x-[2rem] transition-transform"></i>
              <i className="bx bx-plus  text-darkest group-hover:translate-x-[-0rem] translate-x-[-5rem] absolute transition-transform"></i>
            </div>
            Add Task
          </Button>
        </div>
      </div>
      <p className="flex self-center gap-1 items-center py-6">
        Press{" "}
        <span className="border-[2px] border-dark rounded-sm px-2 py-[0.1px]">
          space
        </span>{" "}
        to shuffle
        <i className="bx bx-shuffle"></i>
      </p>
    </div>
  );
}
