import { cn } from "@/lib/utils";
import "@/styles/loading-spinner.css";
import { cva, VariantProps } from "class-variance-authority";

const styles = cva("", {
  variants: {
    thickness: {
      xl: "!w-[3rem]",
      lg: "!w-[2rem]",
      md: "!w-[1.5rem]",
      sm: "!w-[1rem]",
    },
    size: {
      xl: "!border-[0.4rem]",
      lg: "!border-[0.3rem]",
      md: "!border-[0.2rem]",
      sm: "!border-[0.175rem]",
    },
  },
});

export default function LoadingSpinner({
  size = "sm",
  color,
  className,
}: {
  color?: string;
  size?: VariantProps<typeof styles>["thickness"];
  className?: string;
}) {
  return (
    <div className={cn("lds-ring", styles({ thickness: size }), className)}>
      {new Array(4).fill(".").map((_, i) => {
        return (
          <div
            className={cn(styles({ size }))}
            key={i}
            style={
              color
                ? {
                    borderColor: `${color} transparent transparent transparent`,
                  }
                : undefined
            }
          ></div>
        );
      })}
    </div>
  );
}
