import StatisticsCardList from "@/components/app/statistics/StatisticsCardList";
import BarChart from "@/components/general/BarChart";
import Button from "@/components/general/Button";
import consultationArt from "/assets/consultation-art.png";
import { ScrollArea } from "@/components/ui/scrollable";
import { formatDate } from "@/lib/utils";
import { ACCENT_GRADIENT } from "@/lib/config";
import GoalResultsCard from "@/components/app/statistics/GoalResultsCard";
import { TGoal } from "@/types/general";
import Checkbox from "@/components/general/Checkbox";
import GoalHistory from "@/components/app/statistics/GoalHistory";
import useGoalMutation from "@/hooks/useGoalMutation";
import ProgressBar from "@/components/general/ProgressBar";
import StatisticsTotalPoints from "@/components/app/statistics/StatisticsTotalPoints";
import StatisticsCard from "@/components/app/statistics/StatisticsCard";

const stats = [400000, 300000, 200000, 100000, 0];
const days = [
  { item: "Mon", value: 150000 },
  { item: "Tue", value: 50000 },
  { item: "Wed", value: 34800 },
  { item: "Thu", value: 40000 },
  { item: "Fri", value: 400000 },
  { item: "Sat", value: 1000 },
  { item: "Sun", value: 100000 },
];

export default function Statistics() {
  return (
    <main className="px-4 pb-4 grid grid-cols-[11fr_5fr] gap-4">
      <div className="flex flex-col">
        <StatisticsTotalPoints />
        <StatisticsCardList />
        <div className="mt-4 bg-white p-8 rounded-xl flex-1">
          <BarChart yAxis={stats} xAxis={days} className="h-full" />
        </div>
      </div>
      <div>
        <GoalResultsCard />
        <GoalHistory />
      </div>
    </main>
  );
}
