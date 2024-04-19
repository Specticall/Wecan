import { useUser } from "@/context/UserContext";
import personFloatingArt from "/assets/person-floating.png";
import Skeleton from "react-loading-skeleton";
import dashboardBg from "/assets/dashboard-bg.jpg";

export default function DashboardHeader() {
  const { userData } = useUser();

  return (
    <header className="bg-white border-border border-[1px] rounded-lg  overflow-hidden lg:grid-cols-1 relative">
      <img src={dashboardBg} alt="" className="absolute inset-0" />
      {/* <div className="py-8 px-12 flex flex-col justify-center lg:items-center sm:px-6 z-[1]">
        <h1 className="text-xl font-semibold max-w-[22rem] lg:text-center">
          Hi There! Welcome Back{" "}
          {userData ? userData.name.split(" ")[0] : <Skeleton />} 👋
        </h1>
        <p className="mt-6 text-lighter leading-[175%] max-w-[25rem] lg:text-center">
          Looks like you have a happy mood today, that’s good! perhaps its a
          good time to do something productive
        </p>
      </div> */}
      <div className="py-4 px-4 min-h-[20rem]  h-full z-[1] relative flex flex-col w-full">
        <div className="self-end bg-white rounded-full text-dark px-6 py-2">
          Hi There! Welcome Back 👋{" "}
        </div>
        <div className="flex-1"></div>
        <div className="px-6 py-2 bg-dark text-white rounded-full w-fit">
          <i className="bx bx-time-five"></i> 08:45 WIB
        </div>
      </div>
      {/* <img
        src={personFloatingArt}
        alt="Person Floating"
        className="h-full object-contain scale-[140%] translate-x-[2rem] translate-y-[1rem] lg:hidden"
      ></img> */}
    </header>
  );
}
