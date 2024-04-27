import useBackground from "@/hooks/useBackground";
import GoalCard from "../app/statistics/GoalCard";
import Button from "./Button";
import useGoalMutation from "@/hooks/useGoalMutation";
import defaultImage from "/assets/person-holding-trophy.png";
import ConfettiExplosion from "react-confetti-explosion";
import BackgroundCard from "../app/collection/BackgroundCard";
import { ACCENT_GRADIENT } from "@/lib/config";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function GoalPrize() {
  const { goalData } = useGoalMutation();
  const { backgroundData } = useBackground();

  const [claimed, setClaimed] = useState(false);

  const earnedBackground = goalData?.backgroundRewardId
    ? backgroundData?.find(
        (background) => background.id === goalData?.backgroundRewardId
      )
    : undefined;

  return (
    <>
      {!goalData?.hasClaimedReward && (
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
      )}
      <article className="bg-white p-12 py-10 grid grid-cols-[1fr_1fr] gap-12 rounded-lg w-screen max-w-[65rem] place-items-center transition-all duration-500">
        <div className="flex-col flex items-start">
          <h2 className="text-[1.75rem] text-dark font-semibold mb-2 max-w-[20rem] leading-[150%]">
            Congratulations on Completing Your Goal!
          </h2>
          <p className="text-light leading-md">
            Congratulations on reaching your points! Keep pushing forward with
            passion and persistence!
          </p>
          <GoalCard className="mt-8 w-full" />
          <Button className="mx-auto mt-12" onClick={() => setClaimed(true)}>
            Claim Reward
          </Button>
        </div>
        {earnedBackground ? (
          <div className="pointer-events-none relative bg-white-soft p-2 rounded-xl h-full overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 bg-white z-30 translate-y-[-37.5%] translate-x-[-17.5%] w-[175%] h-[200%] transition-all duration-1000 rotate-45",
                claimed && "translate-y-[50%] translate-x-[-100%] "
              )}
            ></div>
            <div
              className="flex
             gap-2 bg-accent items-center justify-center text-white py-2 rounded-md absolute z-10 right-4 top-4 px-4"
            >
              <i className="bx bxs-lock-open-alt text-md"></i>
              <p>New Background Unlocked</p>
            </div>
            <BackgroundCard
              className="w-full h-full shimmer"
              background={{ ...earnedBackground, owned: true }}
            />
          </div>
        ) : (
          <img
            src={defaultImage}
            alt="Reward image default"
            className=" w-[40rem] object-cover"
          />
        )}
      </article>
    </>
  );
}
