import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogDesc() {
  const { contextData } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <div className="mt-10">
      <h3 className="text-dark mb-4">Description</h3>
      <p className="text-lighter leading-[160%]">{userTaskData.description}</p>
    </div>
  );
}
