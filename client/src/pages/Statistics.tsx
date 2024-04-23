import StatisticsCardList from "@/components/app/statistics/StatisticsCardList";
import GoalResultsCard from "@/components/app/statistics/GoalResultsCard";
import GoalHistory from "@/components/app/statistics/GoalHistory";
import StatisticsTotalPoints from "@/components/app/statistics/StatisticsTotalPoints";
import StatisticsBarChart from "@/components/app/statistics/StatisticsBarChart";

export default function Statistics() {
  return (
    <main className="px-4 pb-4 grid grid-cols-[11fr_5fr] gap-4">
      <div className="flex flex-col">
        <StatisticsTotalPoints />
        <StatisticsCardList />
        <StatisticsBarChart />
      </div>
      <div>
        <GoalResultsCard />
        <GoalHistory />
      </div>
    </main>
  );
}
