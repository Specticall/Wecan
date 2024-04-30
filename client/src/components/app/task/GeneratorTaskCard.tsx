import LoadingSpinner from "@/components/general/loadingSpinner";
import { TMood } from "@/context/MoodContext";
import useTaskGenerator from "@/hooks/useTaskGenerator";
import { cn, getMoodColor } from "@/lib/utils";

export default function GeneratorTaskCard({
  isShuffling,
}: {
  isShuffling: boolean;
}) {
  const { generatedTask, generatedTaskQuery } = useTaskGenerator();

  // If any of this there variables are true then the data is still fetching in the background.`isShuffling` is a self made timer to gurantee that a load will always take at least one second to let the animation play.
  const isLoading =
    isShuffling ||
    generatedTaskQuery.isRefetching ||
    generatedTaskQuery.isLoading;

  if (!generatedTask) return;
  return (
    <article className="relative w-full border-[1px] border-border rounded-lg px-8 py-6 overflow-hidden sm:px-6">
      <div
        className={cn(
          "bg-white-soft absolute inset-0 rounded-full aspect-square transition-all duration-700 z-10 flex items-center justify-center translate-y-[-10rem] translate-x-[10rem] origin-top-right"
        )}
        style={{
          scale: isLoading ? "200%" : "0%",
        }}
      ></div>
      <div
        className="absolute inset-0 flex items-center justify-center z-[20] duration-300 transition-all"
        style={{
          opacity: isLoading ? "1" : "0",
        }}
      >
        <LoadingSpinner size="lg" />
      </div>

      {/* === Element === */}
      <div
        className="transition-all duration-200 grid grid-cols-1 grid-rows-[6rem_7.5rem_auto] 3xl:grid-rows-[4rem_7.5rem_auto] 2xl:grid-rows-[8rem_7.5rem_auto]"
        style={{ opacity: isLoading ? "0" : "1" }}
      >
        <div className="flex items-center justify-between gap-6 md:flex-col-reverse md:items-start ">
          <h3 className="text-md max-w-[17.5rem] leading-normal">
            {generatedTask?.title}.
          </h3>
          <div className="flex gap-2 items-center justify-center bg-white-soft rounded-full px-6 py-2 3xl:hidden 2xl:flex ">
            <div
              className="w-3 aspect-square rounded-full "
              style={{
                background: getMoodColor(generatedTask?.mood as TMood),
              }}
            ></div>
            {generatedTask?.mood}
          </div>
        </div>
        <p className="text-light leading-lg mt-8 line-clamp-3">
          {generatedTask?.description}
        </p>
        <div>
          <p className="mt-6 mb-4 text-dark sm:hidden">Task Details</p>
          <div className="flex items-center justify-center gap-2 sm:flex-col-reverse sm:items-start sm:mt-6">
            <div className="flex flex-1 items-center justify-start gap-2">
              <i className="bx bx-trending-up text-lg bg-white-soft p-3 rounded-lg"></i>
              <div className="text-dark ">+ {generatedTask?.points} Points</div>
            </div>
            <p className="text-light sm:mb-2">On Completion</p>
          </div>
        </div>
      </div>
    </article>
  );
}
