import { TMood } from "@/context/MoodContext";
import useTaskDetail from "@/hooks/useTaskDetail";
import { cn, getMoodColor } from "@/lib/utils";
import { TUserTask } from "@/types/general";
// export default function TaskCard({
//   task,
//   className,
//   badgeColor,
//   enableCompleteButton,
//   onDelete = () => {},
//   onComplete = () => {},
// }: {
//   task?: TTask;
//   className?: string;
//   badgeColor?: string;
//   enableCompleteButton?: boolean;
//   onDelete?: () => void;
//   onComplete?: (taskId: string) => void;
// }) {
//   const { handleDelete, handleOpenDetailDialog, isDeleting } = useTaskDetail({
//     task,
//   });

//   return (
//     <article
//       className={cn(
//         "bg-white p-8 rounded-md hover:scale-[97.5%] transition-all duration-200 cursor-pointer",
//         className,
//         isDeleting && "opacity-50"
//       )}
//       onClick={(e) => handleOpenDetailDialog(e)}
//     >
//       <div className="flex gap-6 justify-between items-center">
//         <div>
//           <h2 className="text-md">{task?.title}.</h2>
//           <div className="flex items-center justify-start whitespace-nowrap mt-2 gap-3">
//             <p
//               className="bg-dark px-4 py-[2px] rounded-full text-lightest"
//               style={badgeColor ? { backgroundColor: badgeColor } : undefined}
//             >
//               + {task?.points} pts
//             </p>
//             <p className="text-light text">On Completion</p>
//           </div>
//         </div>
//         <i
//           className="text-md bx bx-trash text-lighter hover:text-dark cursor-pointer transition-all duration-200 self-start mt-2"
//           onClick={() => {
//             onDelete();
//             handleDelete();
//           }}
//         ></i>
//       </div>
//       <p className="mt-8 text-light">{task?.description}</p>
//       {enableCompleteButton && (
//         <Button
//           className="py-2 flex items-center justify-center gap-2 mt-5"
//           onClick={() => {
//             if (!task?.id) return;
//             onComplete(task.id);
//           }}
//         >
//           Complete <i className="text-md bx bx-check"></i>
//         </Button>
//       )}
//     </article>
//   );
// }

type TaskCardProps = {
  task: TUserTask;
};

export default function OnGoingTaskCard({ task }: TaskCardProps) {
  const { handleOpenDetailDialog, isDeleting } = useTaskDetail({ task });

  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 grid-rows-[12rem_4rem] gap-x-4 hover:scale-[97.5%] trasition-all duration-200 cursor-pointer sm:flex sm:flex-col",
        isDeleting && "opacity-50"
      )}
      onClick={handleOpenDetailDialog}
    >
      <div
        className="row-span-3 w-2 h-2 rounded-full mt-3 sm:mb-6"
        style={{ background: getMoodColor(task.mood as TMood) }}
      ></div>
      <div className="overflow-hidden">
        <h3 className="text-md">{task.title}.</h3>
        <p className="text-lighter mt-6 leading-[175%] line-clamp-3 sm:mb-10">
          {task.description}
        </p>
      </div>
      <div className="text-lighter">
        <p className="mb-2">On Completion</p>
        <div className="bg-accent px-4 py-1 text-white w-fit rounded-full">
          +{task.points} Points
        </div>
      </div>
    </article>
  );
}
