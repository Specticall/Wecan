import { CategoryIndicator } from "@/components/general/CategoryIndicator";
import { TGroupedTask } from "./TaskBoard";
import TaskCard from "./TaskCard";

/**
 * Task board for desktop view, displaying both ongoing and completed tasks.
 */
export default function DesktopTaskBoard({
  groupedTask,
}: {
  groupedTask: TGroupedTask;
}) {
  return (
    <>
      <ul className=" flex flex-col gap-12 py-12 3xl:py-8 3xl:gap-8">
        <CategoryIndicator count={groupedTask.onGoing.length} text="On Going" />
        {groupedTask.onGoing.map((task) => {
          return <TaskCard task={task} key={task.id} />;
        })}
      </ul>
      <ul className=" flex flex-col gap-12 py-12  3xl:py-8 3xl:gap-8">
        <CategoryIndicator
          count={groupedTask.completed.length}
          text="Completed"
        />
        {groupedTask.completed.map((task) => {
          return <TaskCard task={task} key={task.id} />;
        })}
      </ul>
    </>
  );
}
