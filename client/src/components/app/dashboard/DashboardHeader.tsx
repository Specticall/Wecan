import { useUser } from "@/context/UserContext";
import personFloatingArt from "/assets/person-floating.png";
import Skeleton from "react-loading-skeleton";

export default function DashboardHeader() {
  const { userData } = useUser();

  return (
    <header className="bg-white border-border border-[1px] rounded-lg  grid grid-cols-[3fr_2fr] overflow-hidden">
      <div className="py-8 px-12 flex flex-col justify-center">
        <h1 className="text-xl font-semibold max-w-[22rem]">
          Hi There! Welcome Back{" "}
          {userData ? userData.name.split(" ")[0] : <Skeleton />} 👋
        </h1>
        <p className="mt-6 text-lighter leading-[175%] max-w-[25rem]">
          Looks like you have a happy mood today, that’s good! perhaps its a
          good time to do something productive
        </p>
      </div>
      <img
        src={personFloatingArt}
        alt="Person Floating"
        className="h-full object-contain scale-[140%] translate-x-[2rem] translate-y-[1rem]"
      ></img>
    </header>
  );
}
