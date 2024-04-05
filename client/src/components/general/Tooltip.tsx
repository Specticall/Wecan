import { twMerge } from "tailwind-merge";

export function Tooltip({
  text,
  count,
  className,
}: {
  text: string;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex text-[0.75rem] text-lighter items-center justify-start gap-2",
        className
      )}
    >
      <p className="text-light">{text}</p>
      <p className="text-darkest bg-border rounded-sm px-2 py-[2px]">{count}</p>
    </div>
  );
}
