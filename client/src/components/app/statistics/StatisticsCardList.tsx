import StatisticsCard from "./StatisticsCard";

export default function StatisticsCardList() {
  return (
    <ul className="grid grid-cols-3 mt-4 gap-4">
      <StatisticsCard
        heading="Task Completed"
        value="160"
        change="+3"
        icon={<i className="bx bx-task"></i>}
      />
      <StatisticsCard
        heading="Average Mood"
        value="Happy"
        icon={<i className="bx bx-task"></i>}
      />
      <StatisticsCard
        heading="Completion Rate"
        value="32%"
        change="+5%"
        icon={<i className="bx bx-task"></i>}
      />
    </ul>
  );
}
