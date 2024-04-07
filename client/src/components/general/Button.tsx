import { cn } from "@/lib/utils";
import { ExtractCVAVariants } from "@/types/general";
import { cva } from "class-variance-authority";

const variants = cva("text-sm px-6 py-3 rounded-full font-medium", {
  variants: {
    variant: {
      primary: "bg-accent text-white shadow-lg shadow-accent/30 shadow-lg",
      secondary:
        "bg-white text-darkest hover:opacity-80 shadow-accent/10 shadow-lg",
      transparent:
        "bg-transparent border-[1px] text-darkest border-darkest hover:bg-black/5",
      dark: "bg-black text-white hover:bg-black hover:opacity-70",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: ExtractCVAVariants<typeof variants>;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  className = "",
  variant,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(variants({ variant }), className)}
    ></button>
  );
}
