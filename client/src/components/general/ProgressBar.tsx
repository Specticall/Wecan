import { ACCENT_GRADIENT } from "@/lib/config";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
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
  progressPercent,
  variant = "light",
  animate,
  className,
}: {
  progressPercent?: number;
  thicknessPx?: number;
  variant?: VariantProps<typeof styles>["bar"];
  className?: string;
  animate?: {
    fromPercentage: number;
    toPercentage: number;
    durationMs: number;
  };
}) {
  // Since progress can become '0' (and can lead to potential type coercion issues) we explicitly say that loading state will only trigger when the `progressPercent` is undefined, not 0 or any other falsy values.
  const progressExist = progressPercent !== undefined;

  const [progress, setProgress] = useState(
    progressExist ? progressPercent / 100 : 0
  );
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
      {progressExist ? (
        <div
          className={twMerge(
            clsx(
              "w-full h-full bg-accent origin-left transition-scale duration-200",
              styles({ track: variant })
            )
          )}
          style={{
            scale: `${progress} 1`,
            background: ACCENT_GRADIENT,
            ...(animate ? { transition: `${animate.durationMs}ms scale` } : {}),
          }}
        ></div>
      ) : (
        <Skeleton width={"100%"} height={"100%"} />
      )}
    </div>
  );
}
