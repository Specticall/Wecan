import { ScrollArea } from "@/components/ui/scrollable";
import EarnedPoints from "@/components/app/dashboard/EarnedPoints";
import OnGoingTask from "@/components/app/dashboard/OnGoingTask";
import { useUser } from "@/context/UserContext";
import DashboardHeader from "@/components/app/dashboard/DashboardHeader";
import MoodSelector from "@/components/app/moodModal/MoodSelector";
import DashboardDiary from "@/components/app/dashboard/DashboardDiary";

export default function Dashboard() {
  const { userData } = useUser();

  if (!userData) return;

  return (
    <ScrollArea className="min-h-[calc(100vh-7rem)] px-4">
      <main className="grid grid-cols-[4fr_3fr] h-full pb-4 gap-4 3xl:grid-cols-1 lg:mt-4">
        <div className="bg-white rounded-xl flex flex-col h-full p-5">
          <DashboardHeader />
          <OnGoingTask />
        </div>
        <div className="flex flex-col 3xl:grid 3xl:grid-cols-2 3xl:gap-4 lg:grid-cols-1">
          <EarnedPoints />
          <MoodSelector variant="clean" className="mt-4" />
          <DashboardDiary />
        </div>
      </main>
    </ScrollArea>
  );
}
