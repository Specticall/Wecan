import { cn } from "@/lib/utils";
import { ExtractCVAVariants } from "@/types/general";
import { cva } from "class-variance-authority";
import { DOMAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./loadingSpinner";

const variants = cva(
  "text-sm px-8 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:grayscale",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent/90",
        secondary: "bg-white text-darkest hover:opacity-80",
        transparent:
          "bg-transparent border-[1px] text-darkest border-darkest hover:bg-black/5",
        dark: "bg-black text-white hover:bg-black hover:opacity-70",
        tertiary: "bg-slate-100 text-light hover:bg-slate-200",
        clean: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: ExtractCVAVariants<typeof variants>;
  className?: string;
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  to?: string;
  children: ReactNode;
  isLoading?: boolean;
  spinnerIconClass?: string;
};

export default function Button({
  className = "",
  variant,
  disabled,
  children,
  spinnerIconClass,
  to = "",
  isLoading = false,
  onClick = () => {},
  ...props
}: ButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        variants({ variant }),
        isLoading && "flex items-center justify-center gap-2",
        className
      )}
      onClick={(e) => {
        if (to) {
          e.preventDefault();
          navigate(to);
        }
        onClick(e);
      }}
    >
      {children}
      {isLoading && <LoadingSpinner size={"sm"} className={spinnerIconClass} />}
    </button>
  );
}
