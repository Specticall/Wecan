import ProgressBar from "@/components/general/ProgressBar";
import StatisticsCard from "./StatisticsCard";

export default function StatisticsCardList() {
  return (
    <ul className="grid grid-cols-3 gap-8">
      <StatisticsCard
        title="Wellness Points"
        subtitle="Earned This Week"
        variant="accent"
      >
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-md text-white">
            {(650000).toLocaleString("de-DE")} Points
          </h3>
          <p className="text-lightest">
            {(500000).toLocaleString("de-DE")} Points
          </p>
        </div>
        <ProgressBar progressPercent={100} variant="dark" thicknessPx={4} />
      </StatisticsCard>
      <StatisticsCard title="Task Completed" subtitle="All Task" variant="dark">
        <h3 className="text-lg text-white">126 Tasks</h3>
      </StatisticsCard>
      <StatisticsCard
        title="Task Completed"
        subtitle="This Week"
        variant="light"
      >
        <h3 className="text-lg text-darkest">32 Tasks</h3>
      </StatisticsCard>
    </ul>
  );
}
