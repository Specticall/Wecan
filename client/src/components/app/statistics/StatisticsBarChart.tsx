import BarChart from "@/components/general/BarChart";
import useBarChartData from "@/hooks/useBarChartData";

const stats = [100000, 75000, 50000, 25000, 0];

export default function StatisticsBarChart() {
  const { pointsEarnedEachDay } = useBarChartData();

  return (
    <div className="mt-4 bg-white p-8 rounded-xl flex-1">
      <BarChart yAxis={stats} xAxis={pointsEarnedEachDay} className="h-full" />
    </div>
  );
}
