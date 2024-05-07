import { ScrollArea } from "@/components/ui/scrollable";
import EarnedPoints from "@/components/app/dashboard/EarnedPoints";
import OnGoingTask from "@/components/app/dashboard/OnGoingTask";
import { useUser } from "@/context/UserContext";
import DashboardHeader from "@/components/app/dashboard/DashboardHeader";
import MoodSelector from "@/components/app/moodModal/MoodSelector";
import DiaryForm from "@/components/app/diary/DiaryForm";
import useGoalMutation from "@/hooks/useGoalMutation";
import Skeleton from "react-loading-skeleton";

// Entry point for the `/app/dashboard` route
export default function Dashboard() {
  return (
    <main className="grid grid-cols-[4fr_3fr] h-full pb-4 gap-4 3xl:grid-cols-1 lg:mt-4 sm:mt-2 px-4">
      <div className="bg-white rounded-xl flex flex-col h-full p-5 sm:p-4">
        <DashboardHeader />
        {/* Only displays onGoingTask when the user has no completed their goal yet  */}
        <OnGoingTask />
      </div>
      <div className="flex flex-col 3xl:grid 3xl:grid-cols-2 3xl:gap-4 lg:grid-cols-1">
        <EarnedPoints />
        <MoodSelector variant="clean" className="mt-4 mb-4 3xl:mb-0" />
        <DiaryForm className=" 3xl:order-2 3xl:row-span-2 3xl:mt-0 lg:h-[25rem] md:p-6 sm:p-4" />
      </div>
    </main>
  );
}
