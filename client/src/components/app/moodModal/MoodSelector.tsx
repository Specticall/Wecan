import { cn, getMoodColor } from "@/lib/utils";
import MoodDropdown from "./MoodDropdown";
import { useMood } from "@/context/MoodContext";
import { cva } from "class-variance-authority";
import useMoodMutation from "@/hooks/useMoodMutation";

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

export default function MoodSelector({
  variant = "accent",
  className,
}: {
  variant: "clean" | "accent";
  className?: string;
}) {
  const { updateMutation } = useMoodMutation();
  const { currentMood: mood } = useMood();

  return (
    <article
      className={cn(
        "bg-accent px-6 py-6 rounded-lg flex items-center justify-center gap-6 transition-all duration-100 3xl:order-1 3xl:mt-0 sm:flex-col sm:items-start",
        styles({ background: variant }),
        className
      )}
      style={
        mood && variant === "accent"
          ? { backgroundColor: getMoodColor(mood) }
          : undefined
      }
    >
      <div className="flex-1 flex gap-6 items-center justify-center">
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
        ></div>
        <div className="flex-1">
          <p className={cn("text-lightest", styles({ subtitle: variant }))}>
            My Mood Today
          </p>
          <h2 className={cn("text-md text-white", styles({ title: variant }))}>
            {mood ? `${mood} Mood` : "Unknown"}
          </h2>
        </div>{" "}
      </div>
      <MoodDropdown
        variant={variant}
        onSetMood={(value) => {
          updateMutation.mutate(value);
        }}
        defaultValue={mood}
      />
    </article>
  );
}
