import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const styles = cva("text-center flex items-center justify-start gap-3", {
  variants: {
    variant: {
      dark: "text-dark [&>i]:text-dark",
      light: "text-white [&>i]:text-white",
    },
  },
});

export default function DateDisplay({
  className,
  date,
  variant = "dark",
  fallback,
}: {
  className?: string;
  date?: Date;
  variant?: VariantProps<typeof styles>["variant"];
  fallback?: string;
}) {
  const formattedDate = date?.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <p className={twMerge(styles({ variant }), className)}>
      <i className="bx bx-calendar text-light text-md"></i>
      {formattedDate || fallback}
    </p>
  );
}
