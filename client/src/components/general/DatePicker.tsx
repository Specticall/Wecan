import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

/**
 * Date picker from shadcn/ui
 * @returns
 */
export default function DatePicker({
  onSelect = () => {},
}: {
  onSelect?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-medium text-dark bg-white hover:bg-lightest border-[1px] border-white-soft",
            !date && "text-muted-foreground"
          )}
        >
          {" "}
          <i className="mr-2 bx bx-calendar text-dark text-md"></i>
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            onSelect(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
