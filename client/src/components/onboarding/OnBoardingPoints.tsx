import WellnessPointInfographic from "./WellnessPointInfographic";
import GoalSlider from "./GoalSlider";
import useUserMutation from "@/hooks/useUserMutation";

export default function OnBoardingPoints() {
  const { updateMutation } = useUserMutation();

  const handleSetPoint = (value: number) => {
    updateMutation.mutate();
  };

  return (
    <main className="section flex-1 grid grid-cols-2 place-items-center py-12 gap-12">
      <article>
        <h1 className="text-xl mb-6">What Are You Looking to Achieve?</h1>
        <p className="text-lighter leading-[175%] mb-10">
          Having goals is a good way to motivate yourself to do more. With our
          wellness points system at Wecan, you can establish goals, big or
          small, and we're here to assist you every step of the way
        </p>
        <p className="text-darkest">Set Your Wellness Points Goal</p>
        <GoalSlider />
      </article>
      <WellnessPointInfographic />
    </main>
  );
}
