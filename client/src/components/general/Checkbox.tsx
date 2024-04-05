import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { MouseEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";

const checkStyles = cva(
  "border-[1px] border-slate-600 rounded-sm flex items-center justify-center aspect-square [&>svg]:aspect-square cursor-pointer transition-bg duration-75",
  {
    variants: {
      size: {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
      },
    },
  }
);

type TStyles = VariantProps<typeof checkStyles>;

type TCheckboxProps = {
  onCheck?: (isChecked: boolean) => void;
  iconColor?: string;
  size?: TStyles["size"];
  onCheckedClassName?: string;
  className?: string;
};

/**
 * Checkbox component,
 * @param onCheck a callback function containing the state of the checkbox that gets invoked when the user clicks the button
 * @param onCheckedClassName className that gets applied when the checkbox in the the "checked" state
 * @param size built-in size classes
 * @returns
 */
export default function Checkbox({
  onCheck = () => {},
  iconColor = "white",
  onCheckedClassName,
  size,
  className,
}: TCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsChecked((cur) => !cur);
    onCheck(!isChecked);
  };

  return (
    <button
      className={twMerge(
        clsx(
          checkStyles({ size }),
          className,
          isChecked && "bg-slate-600",
          isChecked && onCheckedClassName
        )
      )}
      onClick={handleCheck}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>
    </button>
  );
}
