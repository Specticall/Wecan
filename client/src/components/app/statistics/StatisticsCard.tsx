import { ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

type StatisticsCardProps = {
  heading?: string;
  value?: string;
  icon: ReactElement;
  change?: string;
};

export default function StatisticsCard({
  heading,
  value,
  icon,
  change,
}: StatisticsCardProps) {
  // Render loading skeleton if this 2 values are undefined
  const isLoading = heading == undefined || value == undefined;

  if (isLoading) {
    return <Skeleton height={"100%"} className="rounded-xl" />;
  }

  return (
    <li className="grid grid-cols-[1fr_auto] bg-white p-6 rounded-xl">
      <p>{heading}</p>
      <div className=" bg-white-soft rounded-md w-10 [&>i]:text-md flex items-center justify-center aspect-square row-span-2">
        {icon}
      </div>
      <div className=" flex items-center justify-start gap-4 mt-2">
        <h4 className="text-[2rem] text-dark">{value}</h4>
        {change && (
          <p className="px-2 py-[2px] text-accent bg-[#D4D9FF] rounded-md">
            {change}
          </p>
        )}
      </div>
    </li>
  );
}
