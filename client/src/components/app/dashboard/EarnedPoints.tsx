import ProgressBar from "@/components/general/ProgressBar";
import { useUser } from "@/context/UserContext";

export default function EarnedPoints() {
  const { userData } = useUser();

  if (!userData) return;
  const { earnedToday, targetToday } = userData.point;

  const progressPercent =
    targetToday === 0 ? 0 : (earnedToday * 100) / targetToday;
  return (
    <article className="bg-white rounded-md shadow-lg px-10 py-10">
      <div>
        <p>Wellness Points Earned Today</p>
        <h3 className="text-xl">
          {earnedToday.toLocaleString("de-DE")} points
        </h3>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-light text-md ml-auto">{`${Math.round(
            progressPercent
          )}%`}</p>
        </div>
        <ProgressBar progressPercent={progressPercent} />
        <div className="flex justify-between items-center mt-2 text-light text-[0.75rem]">
          <p>Your Progress</p>
          <p>{targetToday.toLocaleString("de-DE")}</p>
        </div>
      </div>
    </article>
  );
}
