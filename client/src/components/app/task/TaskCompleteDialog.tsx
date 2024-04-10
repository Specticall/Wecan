import { useGlobalDialog } from "@/context/GlobalDialogContext";
import celebrationArt from "/assets/task-complete.png";
import { TPoint } from "@/types/general";
import { useUser } from "@/context/UserContext";
import ConfettiExplosion from "react-confetti-explosion";
import ProgressBar from "@/components/general/ProgressBar";
import AnimatedCounter from "@/components/general/AnimatedCounter";
import Button from "@/components/general/Button";

export default function TaskCompleteDialog() {
  const { closeDialog, contextData } = useGlobalDialog();
  const { userData } = useUser();

  if (!contextData || !userData) return;
  const { newData, oldData } = contextData as {
    newData: TPoint;
    oldData: TPoint;
  };

  const oldProgressPercent =
    oldData.targetToday === 0
      ? 0
      : (oldData.earnedToday * 100) / oldData.targetToday;

  const newProgressPercent =
    newData.targetToday === 0
      ? 0
      : (newData.earnedToday * 100) / newData.targetToday;
  return (
    <>
      <ConfettiExplosion
        force={0.6}
        duration={2500}
        particleCount={80}
        width={2000}
        zIndex={101}
        style={{
          translate: "-50%",
          position: "fixed",
          top: "37.5%",
          left: "50%",
        }}
      />
      <article className="bg-white px-12 pb-12 pt-8 rounded-md min-w-[60rem] w-full max-w-[70rem]">
        <div
          className="flex items-center justify-end"
          onClick={() => closeDialog()}
        >
          <i className="bx bx-x text-md text-lighter hover:text-dark duration-200 transition-all cursor-pointer"></i>
        </div>
        <div className="grid grid-cols-2 justify-center gap-20">
          <img src={celebrationArt} alt="People celebrating" />
          <div className="justify-self-start w-full">
            <p className="mt-4 text-lighter">Task Completed</p>
            <h2 className="text-dark text-[2rem]">Congratulations!</h2>
            <p className="mt-8 text-lighter">Wellness Points Earned Today</p>
            <h3 className="text-lg mt-1">
              <AnimatedCounter
                from={oldData.earnedToday}
                to={newData.earnedToday}
                speedMultiplier={200}
              />{" "}
              Points
            </h3>
            <div className="grid grid-cols-2 gap-y-2">
              <div></div>
              <div className="text-lg justify-self-end">
                <AnimatedCounter
                  from={Math.floor(oldProgressPercent)}
                  to={Math.floor(newProgressPercent)}
                  speedMultiplier={1}
                />
                %
              </div>
              <ProgressBar
                animate={{
                  fromPercentage: oldProgressPercent / 100,
                  toPercentage: newProgressPercent / 100,
                  durationMs: 500,
                }}
                progressPercent={newProgressPercent}
                className="col-span-2"
              />
              <p className="text-lighter">Your Progress</p>
              <p className="text-lighter justify-self-end">
                {newData.targetToday.toLocaleString("de-DE")} Points
              </p>
            </div>
            <div className="flex items-center justify-end">
              <Button variant="primary" className="shadow-none mt-12 px-16">
                Done
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
