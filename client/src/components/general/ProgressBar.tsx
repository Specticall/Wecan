import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const styles = cva("", {
  variants: {
    bar: {
      light: "bg-white",
      dark: "bg-dark",
    },
    track: {
      light: "bg-accent",
      dark: "bg-lightest",
    },
  },
});

export default function ProgressBar({
  progressPercent = 50,
  thicknessPx = 6,
  variant = "light",
}: {
  progressPercent: number;
  thicknessPx?: number;
  variant?: VariantProps<typeof styles>["bar"];
}) {
  const progress = progressPercent / 100;
  return (
    <div
      style={{ height: `${thicknessPx}px` }}
      className={twMerge(
        clsx(
          "w-full rounded-full bg-lightest overflow-hidden",
          styles({ bar: variant })
        )
      )}
    >
      <div
        className={twMerge(
          clsx(
            "w-full h-full bg-accent origin-left transition-scale duration-200",
            styles({ track: variant })
          )
        )}
        style={{ scale: `${progress} 1` }}
      ></div>
    </div>
  );
}
