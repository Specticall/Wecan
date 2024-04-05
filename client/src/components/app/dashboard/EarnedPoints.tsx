import ProgressBar from "@/components/general/ProgressBar";

export default function EarnedPoints() {
  const progressPercent = 70;
  return (
    <article className="bg-white rounded-md shadow-lg px-10 py-10">
      <div>
        <p>Wellness Points Earned Today</p>
        <h3 className="text-xl">{(300000).toLocaleString("de-DE")} points</h3>
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
          <p>{(150000).toLocaleString("de-DE")}</p>
        </div>
      </div>
    </article>
  );
}
