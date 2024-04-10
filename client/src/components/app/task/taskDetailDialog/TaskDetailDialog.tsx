import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";
import TaskDetailDialogInfo from "./TaskDetailDialogInfo";
import TaskDetailDialogHeading from "./TaskDetailDialogHeading";
import TaskDetailDialogDesc from "./TaskDetailDialogDesc";
import TaskDetailDialogCTA from "./TaskDetailDialogCTA";

export default function TaskDetailDialog() {
  const { contextData, closeDialog } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <>
      <article className="bg-white rounded-md px-12 pb-12 py-8 w-full max-w-[37.5rem]">
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
    </>
  );
}
