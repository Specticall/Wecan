import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TFilterParams = "completed" | "ongoing";

/*
Used to navigate between the different task status (ongoing / completed) on mobile devices
*/
export default function MobileTaskNavigation() {
  const params = useParams();
  const [selected, setSelected] = useState<TFilterParams>(
    params.status as TFilterParams
  );
  const navigate = useNavigate();

  const handleNavigate = (filter: TFilterParams) => () => {
    setSelected(filter);
    navigate(`/app/task/board/${filter}`);
  };

  if (!params.status) return;

  return (
    <ul className="flex bg-white-soft w-fit px-2 py-2 mb-4 gap-4 rounded-md items-center justify-center h-0 2xl:h-min">
      <li
        onClick={handleNavigate("ongoing")}
        className={cn(
          "px-4 py-1 rounded-md cursor-pointer duration-200 transition-all whitespace-nowrap",
          selected === "ongoing" && "bg-white"
        )}
      >
        On Going
      </li>
      <li
        onClick={handleNavigate("completed")}
        className={cn(
          "px-4 py-1 rounded-md cursor-pointer duration-200 transition-all whitespace-nowrap",
          selected === "completed" && "bg-white"
        )}
      >
        Completed
      </li>
    </ul>
  );
}
