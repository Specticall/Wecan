import MobileTaskNavigation from "@/components/app/task/MobileTaskNavigation";
import TaskGenerator from "@/components/app/task/TaskGenerator";
import TaskNavigation from "@/components/app/task/TaskNavigation";
import TaskProgressBanner from "@/components/app/task/TaskProgressBanner";

import { useUser } from "@/context/UserContext";
import { useViewport } from "@/context/ViewportContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Entry point for the `/app/task` route
export default function Task() {
  const { taskQuery } = useTaskMutation();
  const { type } = useViewport();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /**
   * Reroute the user to the correct page based on the viewport size.
   * On mobile views, due to limited viewing sizes, they either can only either see "ongoing" or "completed" task.
   * When the view transition from small screens to large ones (vice versa), they will be redirected to the corresponding page.
   */
  useEffect(() => {
    if (type !== "3xl" && type !== "2xl" && pathname === "/app/task/list") {
      navigate("/app/task/board");
    }

    if (
      (type === "3xl" || type == "2xl") &&
      (pathname === "/app/task/board/ongoing" ||
        pathname === "/app/task/board/completed")
    ) {
      navigate("/app/task/board");
    }
  }, [type, navigate, pathname]);

  // if (!userData) return;

  return (
    <main className="grid grid-cols-[3fr_5fr] gap-4 px-4 pb-4 2xl:grid-cols-1 sm:p-2 sm:gap-4">
      <div className="">
        <article className="bg-white rounded-xl p-8 lg:p-6 sm:p-6">
          <h2 className="text-lg text-dark font-semibold mb-4 sm:mt-2">
            Get Your Tasks
          </h2>
          <p className="text-light mb-6 pb-6 border-b-[1px] border-border leading-[200%] ">
            Participate in tasks, complete them, and accumulate wellness points
            towards reaching your goals.
          </p>

          <TaskGenerator />
        </article>
        <TaskProgressBanner />
      </div>
      <div className="bg-white rounded-xl p-8 flex flex-col 3xl:p-6 sm:px-4 sm:py-6">
        <div className="grid grid-cols-[1fr_auto]">
          <h1 className="text-lg font-semibold">Your Tasks</h1>
          {!taskQuery.isLoading ? (
            <TaskNavigation className="2xl:invisible" />
          ) : (
            <Skeleton className="rounded-full h-10 w-28" />
          )}
          <p className="text-light mt-2 mb-6 col-span-2">
            The tasks you accepted on this goal period will appear below
          </p>
          <MobileTaskNavigation key={pathname} />
        </div>
        <div className="w-full h-full ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
