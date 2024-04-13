import AllTasksFilterCTA from "./AllTasksFilterCTA";
import usePaginatedTaskMutation from "@/hooks/usePaginatedTaskMutation";
import Button from "@/components/general/Button";
import { ScrollArea } from "@/components/ui/scrollable";
import TaskItem from "./TaskItem";

const PAGE_SIZE = 5;

export default function AllTasks() {
  const {
    paginatedTask,
    taskCount,
    page,
    nextPage,
    prevPage,
    setFilter,
    filter,
    onFirstPage,
    onLastPage,
    setDate,
  } = usePaginatedTaskMutation({
    paginationSize: PAGE_SIZE,
  });

  const taskExist = Boolean(taskCount);

  return (
    <div className="rounded-md col-span-2 mr-8 h-[calc(100vh-10rem)] flex flex-col gap-4">
      <AllTasksFilterCTA
        filter={filter}
        setFilter={setFilter}
        setDate={setDate}
      />
      <div className="px-8 py-8 rounded-md border-lighter border-[1px] h-full flex flex-col">
        <div className="grid grid-cols-[5fr_4fr_2fr_2fr_1fr] w-full pb-2 gap-12 px-8">
          <p>Name</p>
          <p>Date Completed</p>
          <p>Points</p>
          <p>Status</p>
          <div></div>
        </div>
        <ScrollArea className="h-[calc(100vh-23.5rem)]  mt-4">
          <div className=" flex-1 flex flex-col gap-2">
            {paginatedTask
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((task) => {
                return <TaskItem task={task} key={task.id} />;
              })}
          </div>{" "}
        </ScrollArea>
        <div className="flex items-center mt-6">
          <p className="flex justify-between items-center w-full">
            {taskExist
              ? `Showing ${(page - 1) * PAGE_SIZE || 1} -
              ${Math.min(page * PAGE_SIZE, taskCount)} of ${taskCount} tasks`
              : "No tasks to be shown"}
          </p>
          <div className="flex gap-4">
            {taskExist && !onFirstPage && (
              <Button
                onClick={prevPage}
                variant="dark"
                className="rounded-sm p-2 flex items-center justify-center"
              >
                <i className="bx bx-chevron-left text-md"></i>
              </Button>
            )}
            {taskExist && !onLastPage && (
              <Button
                onClick={nextPage}
                variant="dark"
                className="rounded-sm p-2 flex items-center justify-center"
              >
                <i className="bx bx-chevron-right text-md"></i>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
