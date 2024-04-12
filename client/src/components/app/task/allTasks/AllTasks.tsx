import { useState } from "react";
import AllTasksFilterCTA from "./AllTasksFilterCTA";
import useTaskMutation from "@/hooks/useTaskMutation";
import DateDisplay from "@/components/general/DateDisplay";
import { cn } from "@/lib/utils";

export default function AllTasks() {
  const { userTask } = useTaskMutation();
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");
  return (
    <div className="rounded-md col-span-2 mr-8 h-[calc(100vh-10rem)] flex flex-col gap-3">
      <AllTasksFilterCTA filter={filter} setFilter={setFilter} />
      <div className="rounded-md border-lighter border-[1px] flex-1 p-8 items-center justify-start">
        <div className="grid grid-cols-[5fr_4fr_2fr_2fr_1fr] w-full pb-2 px-8 gap-12">
          <p>Name</p>
          <p>Date Completed</p>
          <p>Points</p>
          <p>Status</p>
          <div></div>
        </div>
        {userTask
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((task) => {
            return (
              <div className="grid grid-cols-[5fr_4fr_2fr_2fr_1fr] py-5 bg-white rounded-md mt-4 shadow-lg shadow-slate-100 px-8 gap-12 items-center">
                <h3 className=" text-light truncate">{task.title}</h3>
                <DateDisplay
                  date={
                    task.status === "Completed"
                      ? new Date(task.createdAt)
                      : undefined
                  }
                  fallback="-"
                />
                <p>{task.points}</p>
                <div>
                  <p
                    className={cn(
                      "text-white py-1 rounded-full  w-fit px-4",
                      task.status === "Completed"
                        ? "text-dark bg-slate-100"
                        : "bg-accent"
                    )}
                  >
                    {task.status}
                  </p>
                </div>
                {task.status === "OnGoing" ? (
                  <i className="bx bx-trash text-md text-lighter cursor-pointer hover:text-dark"></i>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
