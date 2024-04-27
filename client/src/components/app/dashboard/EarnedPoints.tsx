import ProgressBar from "@/components/general/ProgressBar";
import useGoalMutation from "@/hooks/useGoalMutation";
import { ACCENT_GRADIENT } from "@/lib/config";

export default function EarnedPoints() {
  const { goalData } = useGoalMutation();
  if (!goalData) return;

  const target = goalData.target;
  const earned = goalData.earned;

  const progressPercent = target === 0 ? 0 : (earned * 100) / target;
  return (
    <article
      className="bg-white rounded-xl p-8 3xl:order-3"
      style={{
        background: ACCENT_GRADIENT,
      }}
    >
      <div className="flex justify-between items-center mb-8 sm:flex-col-reverse sm:items-start">
        <div>
          <p className="text-white">Wellness Points Earned</p>
          <h3 className="text-xl font-semibold text-white">
            {earned.toLocaleString("de-DE")} points
          </h3>
        </div>
        <i className="bx bx-coin-stack text-xl p-4 rounded-lg sm:mb-4 text-accent bg-white"></i>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-lg ml-auto text-white">{`${Math.floor(
            progressPercent
          )}%`}</p>
        </div>
        <ProgressBar variant="dark" progressPercent={progressPercent} />
        <div className="flex justify-between items-center mt-4 text-light text-[0.75rem] ">
          <p className="text-[1rem] text-white">Your Progress</p>
          <p className="text-[1rem] text-white">
            {target.toLocaleString("de-DE")} Points
          </p>
        </div>
      </div>
    </article>
  );
}
