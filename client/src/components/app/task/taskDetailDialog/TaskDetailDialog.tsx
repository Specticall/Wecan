import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";
import TaskDetailDialogInfo from "./TaskDetailDialogInfo";
import TaskDetailDialogHeading from "./TaskDetailDialogHeading";
import TaskDetailDialogDesc from "./TaskDetailDialogDesc";
import TaskDetailDialogCTA from "./TaskDetailDialogCTA";
import { ScrollArea } from "@/components/ui/scrollable";

// Task detail dialog component that shows when user clicks on a task
export default function TaskDetailDialog() {
  const { contextData, closeDialog } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <ScrollArea className="rounded-xl h-full 3xl:h-[calc(100vh-5rem)] 2xl:w-screen 2xl:max-w-[50rem] sm:h-screen sm:w-screen  2xl:px-6 sm:px-0 sm:rounded-none overflow-hidden ">
      <article className="bg-white px-12 pb-12 py-8 w-full lg:max-w-full sm:px-6">
        <div
          className="flex items-center justify-end mb-1"
          onClick={() => closeDialog()}
        >
          <i className="bx bx-x text-md text-lighter hover:text-dark duration-200 transition-all cursor-pointer"></i>
        </div>

        <TaskDetailDialogHeading />
        <TaskDetailDialogDesc />
        <TaskDetailDialogInfo />
        {userTaskData.status === "OnGoing" && <TaskDetailDialogCTA />}
      </article>
    </ScrollArea>
  );
}
