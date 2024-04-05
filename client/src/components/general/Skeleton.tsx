import { cn } from "@/lib/utils";
import "@/styles/loading-skeleton.css";

export function Skeleton({
  className,
  children,
  isLoading = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isLoading: boolean;
}) {
  return isLoading ? (
    <div className={cn("shimmer rounded-md", className)} {...props}></div>
  ) : (
    children
  );
}
