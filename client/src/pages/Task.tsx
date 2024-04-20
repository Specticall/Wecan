import TaskGenerator from "@/components/app/task/TaskGenerator";
import TaskNavigation from "@/components/app/task/TaskNavigation";
import TaskProgressBanner from "@/components/app/task/TaskProgressBanner";

import { useUser } from "@/context/UserContext";
import { Outlet } from "react-router-dom";

export default function Task() {
  const { userData } = useUser();

  if (!userData) return;

  return (
    <main className="grid grid-cols-[3fr_5fr] gap-4 px-4 pb-4">
      <div className="">
        <article className="bg-white rounded-xl p-8">
          <h2 className="text-lg text-dark font-semibold mb-4">
            Get Your Tasks
          </h2>
          <p className="text-light mb-6 pb-6 border-b-[1px] border-border">
            Participate in tasks, complete them, and accumulate wellness points
            towards reaching your goals.
          </p>
          <TaskGenerator />
        </article>
        <TaskProgressBanner />
      </div>
      <div className="bg-white rounded-xl p-8 flex flex-col">
        <div className="grid grid-cols-[1fr_auto]">
          <h1 className="text-lg font-semibold">Your Tasks</h1>
          <TaskNavigation />
          <p className="text-light mt-2 mb-6 col-span-2">
            The tasks you accepted on this goal period will appear below
          </p>
        </div>
        <div className="w-full h-full ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
