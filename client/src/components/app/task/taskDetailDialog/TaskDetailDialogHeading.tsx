import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogHeading() {
  const { contextData } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <>
      <header className="grid grid-cols-[1fr_auto] gap-y-1 gap-x-4">
        <p className="text-lighter">Task Details</p>
        <div></div>
        <h2 className="text-lg text-darkest">{userTaskData.title}.</h2>
        <div className="self-center px-8 py-[.375rem] border-border border-[1px] rounded-full text-[1rem]">
          {userTaskData.status}
        </div>
      </header>
      <div className="text-dark mt-6">
        {userTaskData.status === "OnGoing" ? "Valid Until" : "Completed At"}
        <span className="px-4 py-2 rounded-full bg-slate-100 text-dark ml-4">
          {new Date(
            userTaskData.status === "OnGoing"
              ? userTaskData.createdAt
              : userTaskData.completedAt!
          ).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </>
  );
}
