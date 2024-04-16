import ProgressBar from "@/components/general/ProgressBar";
import useGoalMutation from "@/hooks/useGoalMutation";

export default function EarnedPoints() {
  const { goalData } = useGoalMutation();
  if (!goalData) return;

  const target = goalData.target;
  const earned = goalData.earned;

  const progressPercent = target === 0 ? 0 : (earned * 100) / target;
  return (
    <article className="bg-white rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p>Wellness Points Earned</p>
          <h3 className="text-xl font-semibold">
            {earned.toLocaleString("de-DE")} points
          </h3>
        </div>
        <i className="bx bx-coin-stack text-xl bg-white-soft p-4 rounded-lg text-dark"></i>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-light text-lg ml-auto">{`${Math.round(
            progressPercent
          )}%`}</p>
        </div>
        <ProgressBar progressPercent={progressPercent} />
        <div className="flex justify-between items-center mt-4 text-light text-[0.75rem] ">
          <p className="text-[1rem] text-dark">Your Progress</p>
          <p className="text-[1rem] text-dark">
            {target.toLocaleString("de-DE")} Points
          </p>
        </div>
      </div>
    </article>
  );
}
