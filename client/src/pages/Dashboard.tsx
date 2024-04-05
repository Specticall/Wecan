import { ScrollArea } from "@/components/ui/scrollable";
import EarnedPoints from "@/components/app/dashboard/EarnedPoints";
import OnGoingTask from "@/components/app/dashboard/OnGoingTask";
import DashboardQuotes from "@/components/app/dashboard/DashboardQuotes";
import DiaryForm from "@/components/app/dashboard/DiaryForm";

export default function Dashboard() {
  const hasCreatedADiaryToday = false;
  return (
    <ScrollArea className="h-screen">
      <main className="grid grid-cols-[3fr_4fr] grid-rows-[8rem_1fr] items-start">
        <div className="col-span-2 self-start justify-self-start">
          <h1 className="text-lg font-semibold pt-12 pb-12 mb-4">
            Welcome back, Joseph!
          </h1>
        </div>
        {hasCreatedADiaryToday ? <DashboardQuotes /> : <DiaryForm />}
        <div className="px-16 flex flex-col gap-8">
          <EarnedPoints />
          <OnGoingTask />
        </div>
      </main>
    </ScrollArea>
  );
}
