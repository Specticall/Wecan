import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TUserTask } from "@/types/general";
import TaskDetailDialogInfo from "./TaskDetailDialogInfo";
import TaskDetailDialogHeading from "./TaskDetailDialogHeading";
import TaskDetailDialogDesc from "./TaskDetailDialogDesc";
import Button from "@/components/general/Button";
import ConfettiExplosion from "react-confetti-explosion";

export default function TaskDetailDialog() {
  const { contextData, closeDialog } = useGlobalDialog();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  return (
    <>
      <ConfettiExplosion
        force={0.6}
        duration={2500}
        particleCount={80}
        width={2000}
        zIndex={101}
      />
      <article className="bg-white rounded-md px-12 pb-12 py-8 w-full max-w-[37.5rem] isolate">
        <div
          className="flex items-center justify-end mb-1"
          onClick={() => closeDialog()}
        >
          <i className="bx bx-x text-md text-lighter hover:text-dark duration-200 transition-all cursor-pointer"></i>
        </div>

        {/* <ConfettiExplosion
        force={0.6}
        duration={2500}
        particleCount={80}
        width={1000}
      />
      <ConfettiExplosion /> */}
        <TaskDetailDialogHeading />
        <TaskDetailDialogDesc />
        <TaskDetailDialogInfo />
        {userTaskData.status === "OnGoing" && (
          <div className="grid grid-cols-3 mt-12">
            <Button variant="tertiary" className="">
              Discard
            </Button>
            <div></div>
            <Button variant="primary" className="shadow-none">
              Complete
            </Button>
          </div>
        )}
      </article>
    </>
  );
}
