import BarChart from "@/components/general/BarChart";
import useBarChartData from "@/hooks/useBarChartData";

const stats = [100000, 75000, 50000, 25000, 0];

// Wrapper over the barchart component that displays the points earned each day in the past week.
export default function StatisticsBarChart() {
  const { pointsEarnedEachDay } = useBarChartData();

  return (
    <div className="mt-4 bg-white p-8 rounded-xl flex-1 md:hidden">
      <BarChart
        yAxis={stats}
        xAxis={pointsEarnedEachDay}
        className="h-full 2xl:h-[25rem]"
      />
    </div>
  );
}
