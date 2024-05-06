import { DialogCollapse, useGlobalDialog } from "@/context/GlobalDialogContext";
import celebrationArt from "/assets/task-complete.png";
import { TGoal } from "@/types/general";
import { useUser } from "@/context/UserContext";
import ConfettiExplosion from "react-confetti-explosion";
import ProgressBar from "@/components/general/ProgressBar";
import AnimatedCounter from "@/components/general/AnimatedCounter";
import Button from "@/components/general/Button";
import { ScrollArea } from "@/components/ui/scrollable";

/*
Displays a success / congratulation message when a user completes a task
*/
export default function TaskCompleteDialog() {
  const { closeDialog, contextData } = useGlobalDialog();
  const { userData } = useUser();

  if (!contextData || !userData) return;
  const { newUserGoal, oldUserGoal } = contextData as {
    newUserGoal: TGoal;
    oldUserGoal: TGoal;
  };
  /**
   * Both the old and new progress percents are used to display an animation where the counter for point and progress bar goes up.
   */
  // Calculate the previous (old) progress percentage of the user's goal
  const oldProgressPercent =
    oldUserGoal.target === 0
      ? 0
      : (oldUserGoal.earned * 100) / oldUserGoal.target;

  // Calculate the new progress percentage of the user's goal
  const newProgressPercent =
    newUserGoal.target === 0
      ? 0
      : (newUserGoal.earned * 100) / newUserGoal.target;
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
      <ScrollArea className="h-full 4xl:h-[calc(100vh-5rem)] rounded-xl w-screen px-4 max-w-[35rem] lg:max-w-[35rem] sm:h-full sm:rounded-none">
        <article className="bg-white px-12 pb-12 pt-8 rounded-md md:px-8">
          <div
            className="flex items-center justify-end"
            onClick={() => closeDialog()}
          >
            <i className="bx bx-x text-md text-lighter hover:text-dark duration-200 transition-all cursor-pointer"></i>
          </div>
          <div className="justify-center gap-20 grid-cols-1 xl:gap-0">
            <img src={celebrationArt} alt="People celebrating" />
            <div className="justify-self-start w-full">
              <p className="mt-4 text-lighter text-center">Task Completed</p>
              <h2 className="text-dark text-[2rem] font-semibold text-center md:text-[1.75rem] ">
                Congratulations!
              </h2>
              <p className="mt-8 text-lighter">Wellness Points</p>
              <h3 className="text-lg mt-1">
                <AnimatedCounter
                  from={oldUserGoal.earned}
                  to={newUserGoal.earned}
                  speedMultiplier={200}
                />{" "}
                Points
              </h3>
              <div className="grid grid-cols-2 gap-y-2">
                <div></div>
                <div className="text-lg justify-self-end sm:text-md">
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
                  {newUserGoal.target.toLocaleString("de-DE")} Points
                </p>
              </div>
              <div className="flex items-center justify-end">
                <DialogCollapse>
                  <Button variant="primary" className="shadow-none mt-12 px-16">
                    Done
                  </Button>
                </DialogCollapse>
              </div>
            </div>
          </div>
        </article>{" "}
      </ScrollArea>
    </>
  );
}
