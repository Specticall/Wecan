import Button from "@/components/general/Button";
import DatePicker from "@/components/general/DatePicker";
import { cn } from "@/lib/utils";

const CTAList = [
  { display: "All Task", value: "All" },
  { display: "On Going", value: "OnGoing" },
  { display: "Completed", value: "Completed" },
] as const;

// Button list component that displays the filter options for the task list. Will trigger the respective filter when clicked.
export default function AllTasksFilterCTA({
  filter,
  setFilter,
  setDate,
}: {
  filter: "All" | "OnGoing" | "Completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"All" | "OnGoing" | "Completed">
  >;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="w-full flex justify-between items-center ">
      <div className="flex [&>button]:py-2 [&>button]:px-4 gap-2 bg-white-soft rounded-md p-2">
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
      <DatePicker onSelect={setDate} />
    </div>
  );
}
