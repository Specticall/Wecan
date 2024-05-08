import { cn, getMoodColor } from "@/lib/utils";
import MoodDropdown from "./MoodDropdown";
import { useMood } from "@/context/MoodContext";
import { cva } from "class-variance-authority";
import useMoodMutation from "@/hooks/useMoodMutation";
import Skeleton from "react-loading-skeleton";
import Suspend from "@/components/general/SkeletonWrapper";

const styles = cva("", {
  variants: {
    background: {
      clean: "bg-white shadow-xl shadow-accent/5",
      accent: "",
    },
    title: {
      clean: "text-dark",
      accent: "",
    },
    subtitle: {
      clean: "text-lighter",
      accent: "",
    },
    face: {
      clean: "bg-accent",
      accent: "",
    },
  },
});

// Wrapper over mood dropdown, this compent adds a functionality where the user can see the mood they have selected.
// Note that since the mood dropdown itself does an optimistic update to the database, the way this query knows what mood the user has right now is from the query which then gets validated once the request has completed.
export default function MoodSelector({
  variant = "accent",
  className,
}: {
  variant: "clean" | "accent";
  className?: string;
}) {
  const { updateMutation } = useMoodMutation();
  const { currentMood: mood, moodQuery } = useMood();

  // if (!mood)
  //   return <Skeleton className="my-4 2xl:my-0 h-[7rem] w-full 3xl:order-1" />;
  return (
    <article
      className={cn(
        "bg-accent px-6 py-6 rounded-lg flex items-center justify-center gap-6 transition-all duration-100 3xl:order-1 3xl:mt-0 md:flex-col md:items-center md:gap-6",
        styles({ background: variant }),
        className
      )}
      style={
        mood && variant === "accent"
          ? { backgroundColor: getMoodColor(mood) }
          : undefined
      }
    >
      <div className="flex-1 flex gap-6 items-center justify-center md:justify-between md:w-full md:flex-row-reverse ">
        <Suspend
          renderFallback={moodQuery.isLoading}
          fallback={<Skeleton className="w-14 h-14 rounded-full" />}
        >
          <div
            className={cn(
              "w-14 aspect-square rounded-full bg-white",
              styles({ face: variant })
            )}
            style={
              mood && variant === "clean"
                ? { backgroundColor: getMoodColor(mood) }
                : undefined
            }
          />
        </Suspend>
        <div className="flex-1 md:flex-grow-0 whitespace-nowrap">
          <Suspend
            fallback={<Skeleton count={2} className="w-32 h-6" />}
            renderFallback={moodQuery.isLoading}
          >
            <p className={cn("text-lightest", styles({ subtitle: variant }))}>
              My Mood Today
            </p>
            <h2
              className={cn("text-md text-white", styles({ title: variant }))}
            >
              {mood ? `${mood} Mood` : "Unknown"}
            </h2>
          </Suspend>
        </div>{" "}
      </div>
      <Suspend
        renderFallback={moodQuery.isLoading}
        fallback={<Skeleton className="w-32 h-10 rounded-full" />}
      >
        <MoodDropdown
          variant={variant}
          onSetMood={(value) => {
            updateMutation.mutate(value);
          }}
          defaultValue={mood}
        />
      </Suspend>
    </article>
  );
}
