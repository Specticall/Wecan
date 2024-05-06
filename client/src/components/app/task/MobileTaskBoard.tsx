import { CategoryIndicator } from "@/components/general/CategoryIndicator";
import { TGroupedTask } from "./TaskBoard";
import TaskCard from "./TaskCard";

export default function MobileTaskBoard({
  groupedTask,
  status,
}: {
  groupedTask: TGroupedTask;
  status: "completed" | "onGoing";
}) {
  return (
    <ul className=" flex flex-col gap-12 py-12  3xl:py-8 3xl:gap-8">
      <CategoryIndicator
        count={groupedTask[status].length}
        text={status === "onGoing" ? "On Going" : "Completed"}
      />
      {groupedTask[status].map((task) => {
        return <TaskCard task={task} key={task.id} />;
      })}
    </ul>
  );
}
