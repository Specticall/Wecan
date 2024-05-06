import useHistoryMutation from "@/hooks/useHistoryMutation";
import StatisticsCard from "./StatisticsCard";
import useGoalMutation from "@/hooks/useGoalMutation";
import { formatNumber } from "@/lib/utils";

// Parent component of the statistics cards, contains the calculation logic for the statistics itself.
export default function StatisticsCardList() {
  const { historyData } = useHistoryMutation();
  const { goalData } = useGoalMutation();

  const completedTaskToday =
    historyData && historyData?.taskCompleted > 0
      ? `+ ${formatNumber(historyData.taskCompleted)}`
      : undefined;

  const completionPercent = goalData
    ? `${goalData.completionPercent}%`
    : undefined;

  const completionPercentToday = historyData
    ? `${historyData.completionPercent}%`
    : undefined;

  return (
    <ul className="grid grid-cols-2 mt-4 gap-4 md:grid-cols-1">
      {/* How many task the user has completed */}
      <StatisticsCard
        heading="Task Completed"
        value={formatNumber(goalData?.taskCompleted)}
        change={completedTaskToday}
        icon={<i className="bx bx-task"></i>}
      />
      {/* Completion the user has earned */}
      <StatisticsCard
        heading="Completion Rate"
        value={completionPercent}
        change={completionPercentToday}
        icon={<i className="bx bx-task"></i>}
      />
    </ul>
  );
}
