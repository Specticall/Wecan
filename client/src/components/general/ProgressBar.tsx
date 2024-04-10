import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const styles = cva("", {
  variants: {
    bar: {
      light: "bg-lightest",
      dark: "bg-dark",
    },
    track: {
      light: "bg-accent",
      dark: "bg-lightest",
    },
  },
});

export default function ProgressBar({
  thicknessPx = 6,
  progressPercent = 50,
  variant = "light",
  animate,
  className,
}: {
  progressPercent: number;
  thicknessPx?: number;
  variant?: VariantProps<typeof styles>["bar"];
  className?: string;
  animate?: {
    fromPercentage: number;
    toPercentage: number;
    durationMs: number;
  };
}) {
  const [progress, setProgress] = useState(() => progressPercent / 100);

  useEffect(() => {
    if (!animate) return;

    setProgress(animate.fromPercentage);

    setTimeout(() => {
      setProgress(animate.toPercentage);
    }, 0);
  }, [animate]);
  return (
    <div
      style={{ height: `${thicknessPx}px` }}
      className={twMerge(
        clsx(
          "w-full rounded-full bg-lightest overflow-hidden",
          styles({ bar: variant }),
          className
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
        style={{
          scale: `${progress} 1`,
          ...(animate ? { transition: `${animate.durationMs}ms scale` } : {}),
        }}
      ></div>
    </div>
  );
}
