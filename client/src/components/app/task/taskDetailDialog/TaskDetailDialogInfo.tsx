import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TMood } from "@/context/MoodContext";
import { getMoodColor } from "@/lib/utils";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogInfo() {
  const { contextData } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;
  return (
    <div className="grid grid-cols-2 gap-8 mt-8">
      <article className="p-8 border-border border-[1px] rounded-md">
        <div
          className="w-16 aspect-square rounded-full mb-16"
          style={{ background: getMoodColor(userTaskData.mood as TMood) }}
        ></div>
        <h4 className="text-md mb-3">{userTaskData.mood} Task</h4>
        <p className="text-lighter">
          This task is best done when you are {userTaskData.mood.toLowerCase()}.
        </p>
      </article>
      <article className="p-8 border-border border-[1px] rounded-md">
        <div className="w-16 aspect-square rounded-full mb-16 bg-slate-100 flex items-center justify-center">
          <i className="bx bx-trending-up text-xl"></i>
        </div>
        <h4 className="text-md mb-3">+{userTaskData.points} points</h4>
        <p className="text-lighter">Will be earned on completion</p>
      </article>
    </div>
  );
}
