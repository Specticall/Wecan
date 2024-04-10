import { Skeleton } from "@/components/general/Skeleton";
import { useMood } from "@/context/MoodContext";
import useTaskGenerator from "@/hooks/useTaskGenerator";
import { getMoodColor } from "@/lib/utils";

export default function GeneratorTaskCard() {
  const { currentMood } = useMood();
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();

  const moodColor =
    generatedTask?.mood &&
    generatedTask.mood !== "Unknown" &&
    getMoodColor(generatedTask?.mood);

  return (
    <article className="shadow-lg relative w-full">
      <Skeleton
        isLoading={
          generatedTaskQuery.isLoading || generatedTaskQuery.isRefetching
        }
        className="h-48"
      >
        <article className="bg-white p-8 rounded-md">
          <div className="flex gap-6 justify-between items-center">
            <h2 className="text-md">{generatedTask?.title}.</h2>
            <div className="flex flex-col items-center justify-center">
              <p className="text-light text mb-2">On Completion</p>
              <p
                className="bg-dark px-4 py-[2px] rounded-full text-lightest"
                style={moodColor ? { backgroundColor: moodColor } : undefined}
              >
                + {generatedTask?.points} pts
              </p>
            </div>
          </div>
          <p className="mt-8 text-light">{generatedTask?.description}</p>
        </article>
      </Skeleton>
      <div
        className="bg-accent inset-0 translate-y-4 absolute z-[-1] rounded-md scale-[97.5%] card-2 transition-all duration-100"
        style={currentMood && { backgroundColor: getMoodColor(currentMood) }}
      ></div>
      <div className="bg-slate-300 inset-0 translate-y-7 absolute rounded-md scale-[95%] z-[-2] card-3"></div>
    </article>
  );
}
