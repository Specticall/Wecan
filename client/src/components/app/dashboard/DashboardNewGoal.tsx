import Button from "@/components/general/Button";
import GoalSlider from "@/components/onboarding/GoalSlider";

export default function DashboardNewGoal() {
  return (
    <article className="absolute inset-0 z-10 grid place-items-center">
      <div className="bg-white/80 p-10 rounded-xl backdrop-blur-md ">
        <h2 className="text-lg text-dark font-semibold">Start A New Goal</h2>
        <p className="text-light mt-2">
          Your next journey is on the horizon, let’s start your next goal!
        </p>
        <div className="bg-white p-8 rounded-xl mt-8 mb-6">
          <GoalSlider />
        </div>
        <div className="flex justify-end">
          <Button className="mt-2">Set Goal</Button>
        </div>
      </div>
    </article>
  );
}
