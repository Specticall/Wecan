import Button from "@/components/general/Button";
import personHappyArt from "/assets/person-happy.png";
import { ACCENT_GRADIENT } from "@/lib/config";
import ConfettiExplosion from "react-confetti-explosion";

export default function GoalCompletedDialog() {
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
      <article className="bg-white rounded-xl p-12 max-w-[35rem] flex flex-col items-center justify-center">
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
        <Button
          className="mt-8 flex items-center justify-center gap-2 py-3 hover:opacity-80"
          style={{
            background: ACCENT_GRADIENT,
          }}
        >
          View My Results
          <i className="bx bx-chevron-right text-md"></i>
        </Button>
      </article>{" "}
    </>
  );
}
