import ProgressBar from "@/components/general/ProgressBar";
import { ACCENT_GRADIENT } from "@/lib/config";

export default function StatisticcTotalPoints() {
  return (
    <article className="grid grid-cols-[1fr_auto] bg-white p-8 rounded-2xl">
      <p className="text-light mb-2">Total Points Earned</p>
      <i
        className="bx bx-coin-stack row-span-2 bg-white-soft text-[2rem] p-4 rounded-xl text-white flex items-center justify-center aspect-square w-18"
        style={{ background: ACCENT_GRADIENT }}
      ></i>
      <div className="flex items-center justify-start gap-6">
        <h2 className="text-xl font-semibold">150.000 Points</h2>
        <div className="bg-[#D4D9FF] text-accent py-1 px-3 rounded-lg">
          +5.45% Today
        </div>
      </div>
      <ProgressBar className="col-span-2 mt-8" progressPercent={50} />
      <div className="flex items-center justify-between col-span-2 mt-3">
        <p className="text-light">Your Progress</p>
        <p className="text-light">500.000</p>
      </div>
    </article>
  );
}
