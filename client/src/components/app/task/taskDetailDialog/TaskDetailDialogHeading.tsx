import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogHeading() {
  const { contextData } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <>
      <header className="grid grid-cols-[1fr_auto] gap-y-1 gap-x-4">
        <div className="self-center px-8 py-[.375rem] border-border border-[1px] rounded-full text-[1rem] hidden md:block col-span-2 w-fit mt-4 mb-4">
          {userTaskData.status}
        </div>
        <p className="text-lighter">Task Details</p>
        <div></div>
        <h2 className="text-lg text-darkest">{userTaskData.title}.</h2>
        <div className="self-center px-8 py-[.375rem] border-border border-[1px] rounded-full text-[1rem] md:hidden">
          {userTaskData.status}
        </div>
      </header>
      <div className="text-dark mt-6">
        {userTaskData.status === "Completed" && "Completed At"}
        {userTaskData.status === "Completed" && (
          <span className="px-4 py-2 rounded-full bg-slate-100 text-dark ml-4">
            {new Date(userTaskData.completedAt!).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </>
  );
}
