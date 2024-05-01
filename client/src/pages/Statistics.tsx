import StatisticsCardList from "@/components/app/statistics/StatisticsCardList";
import GoalResultsCard from "@/components/app/statistics/GoalResultsCard";
import GoalHistory from "@/components/app/statistics/GoalHistory";
import StatisticsTotalPoints from "@/components/app/statistics/StatisticsTotalPoints";
import StatisticsBarChart from "@/components/app/statistics/StatisticsBarChart";

// Entry point for the `/app/statistics` route
export default function Statistics() {
  return (
    <main className="px-4 pb-4 grid grid-cols-[11fr_5fr] gap-4 3xl:grid-cols-[11fr_6fr] 2xl:grid-cols-1">
      <div className="flex flex-col">
        <StatisticsTotalPoints />
        <StatisticsCardList />
        <StatisticsBarChart />
      </div>
      <div className="grid 2xl:grid-cols-2 gap-4 lg:grid-cols-1">
        <GoalResultsCard />
        <GoalHistory />
      </div>
    </main>
  );
}
