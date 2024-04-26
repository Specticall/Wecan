import { useUser } from "@/context/UserContext";
import Clock from "@/components/general/Clock";
import useGoalMutation from "@/hooks/useGoalMutation";
import DashboardNewGoal from "./DashboardNewGoal";

export default function DashboardHeader() {
  const { userData } = useUser();
  const { goalData } = useGoalMutation();

  return (
    <header className="bg-white border-border border-[1px] rounded-lg  overflow-hidden lg:grid-cols-1 relative flex-1">
      {goalData?.status === "Completed" && <DashboardNewGoal />}
      <img
        src={userData?.selectedBackgroundURL}
        alt=""
        className="absolute inset-0 object-center h-full w-full object-cover"
      />
      <div className="py-4 px-4 min-h-[20rem]  h-full z-[1] relative flex flex-col w-full">
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
