import Button from "@/components/general/Button";
import personHappyArt from "/assets/person-happy.png";
import { ACCENT_GRADIENT } from "@/lib/config";
import ConfettiExplosion from "react-confetti-explosion";
import useClaimReward from "@/hooks/useClaimReward";
import useGoalMutation from "@/hooks/useGoalMutation";
import { DialogCollapse } from "@/context/GlobalDialogContext";

// Dialog that appears when a user completes a goal
export default function GoalCompletedDialog() {
  const { claimMutation } = useClaimReward();
  const { goalData } = useGoalMutation();
  const hasReward = goalData?.backgroundRewardId;
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
      <article className="bg-white rounded-xl p-12 max-w-[40rem] flex flex-col items-center justify-center">
        {!hasReward && (
          <div className="dotted-grid bg-white-soft px-8 py-6 border-border rounded-lg mb-8">
            <h3 className="text-md font-semibold text-center">
              You've Gotten All The Rewards
            </h3>
            <p className="text-center text-light mt-3">
              You have claimed all rewards for this difficulty. Attempt other
              difficulty to obtain the corresponding background
            </p>
          </div>
        )}
        <img
          src={personHappyArt}
          alt="Person Being Happy"
          className="w-[30rem] mb-4"
        />
        <h2 className="text-[2rem] text-dark font-semibold">Goal Completed!</h2>
        <p className="text-light mt-4 text-center leading-md px-12">
          Great Job! You have successfully reached your goal, we’ve prepared a
          special gift just for you!
        </p>
        {/* Only display claim reward if a reward exist (if user has claimed all rewards the none will appear) */}
        {hasReward ? (
          <Button
            className="mt-8 flex items-center justify-center gap-2 py-3 hover:opacity-80"
            style={{
              background: ACCENT_GRADIENT,
            }}
            disabled={claimMutation.isLoading}
            isLoading={claimMutation.isLoading}
            onClick={() => {
              claimMutation.mutate();
            }}
          >
            Claim Reward
            <i className="bx bx-chevron-right text-md"></i>
          </Button>
        ) : (
          <DialogCollapse>
            <Button className="mt-8">Close</Button>
          </DialogCollapse>
        )}
      </article>{" "}
    </>
  );
}
