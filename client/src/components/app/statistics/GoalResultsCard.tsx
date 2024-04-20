import { ACCENT_GRADIENT } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export default function GoalResultsCard() {
  return (
    <article className="bg-white rounded-2xl p-8">
      <h2 className="text-lg text-dark">Goal Results</h2>
      <p className="text-light leading-md mt-2">
        You can view your results once you have completed your goal point
        requirements
      </p>
      <div
        className="grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] p-8 rounded-2xl mt-8"
        style={{ background: ACCENT_GRADIENT }}
      >
        <p className="bg-white text-dark rounded-full px-4 py-1 w-fit">
          On Progress
        </p>
        <i className="bx bx-trophy text-[2rem] text-white"></i>
        <div className="mt-12">
          <h3 className="text-lg text-white mb-1">
            {(500_000).toLocaleString("de-DE")} Point Goal
          </h3>
          <p className="text-lightest">Started {formatDate(new Date())}</p>
        </div>
      </div>
    </article>
  );
}
