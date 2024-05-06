import { useUser } from "@/context/UserContext";
import Clock from "@/components/general/Clock";
import useGoalMutation from "@/hooks/useGoalMutation";
import DashboardNewGoal from "./DashboardNewGoal";
import { cn } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import Suspend from "@/components/general/SkeletonWrapper";

export default function DashboardHeader() {
  const { userData } = useUser();
  const { goalData } = useGoalMutation();

  return (
    <header className="bg-white border-border border-[1px] rounded-lg  lg:grid-cols-1 relative flex-1">
      {goalData?.status === "Completed" && <DashboardNewGoal />}
      <Suspend
        fallback={
          <Skeleton
            className="absolute inset-0 object-center h-full w-full object-cover  rounded-xl"
            containerClassName="flex"
          />
        }
        renderFallback={!userData || !goalData}
      >
        <img
          src={userData?.selectedBackgroundURL}
          alt=""
          className="absolute inset-0 object-center h-full w-full object-cover  rounded-xl"
        />
      </Suspend>
      <div
        className={cn(
          "py-4 px-4 min-h-[20rem] h-full z-[1] relative flex flex-col w-full",
          goalData?.status === "Completed" && "3xl:h-[35rem]"
        )}
      >
        <div className="self-end bg-white rounded-full text-dark px-6 py-2">
          Hi There! Welcome Back 👋{" "}
        </div>
        <div className="flex-1"></div>
        <div className="px-6 py-2 bg-dark text-white gap-2 flex items-center justify-center rounded-full w-fit">
          <i className="bx bx-time-five text-[1rem]"></i> <Clock />
        </div>
      </div>
    </header>
  );
}
