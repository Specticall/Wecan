import Button from "@/components/general/Button";
import { cn } from "@/lib/utils";

const CTAList = [
  { display: "All Task", value: "all" },
  { display: "On Going", value: "ongoing" },
  { display: "Completed", value: "completed" },
] as const;

export default function AllTasksFilterCTA({
  filter,
  setFilter,
}: {
  filter: "all" | "ongoing" | "completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "ongoing" | "completed">
  >;
}) {
  return (
    <div className="grid grid-cols-3 max-w-[20rem] [&>button]:py-2">
      {CTAList.map((item) => (
        <Button
          key={`${item.value}${item.display}`}
          variant="clean"
          className={cn(
            "rounded-sm",
            filter === item.value && "bg-white shadow-lg shadow-slate-100"
          )}
          onClick={(e) => {
            e.preventDefault();
            setFilter(item.value);
          }}
        >
          {item.display}
        </Button>
      ))}
    </div>
  );
}
