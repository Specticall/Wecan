import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const navigateList = [
  { path: "/onboarding/step-1", display: "Select Mood" },
  {
    path: "/onboarding/step-2",
    display: "Set Goals",
  },
  {
    path: "/onboarding/step-3",
    display: "Create Diary",
  },
] as const;

export default function OnboardingNavigation() {
  const { pathname } = useLocation();

  return (
    <nav className="relative flex justify-between items-center mt-12 mb-8 max-w-[32rem] mx-auto ">
      <div className="absolute left-12 right-12 top-[25%] h-[1px] bg-slate-300 z-[-1] "></div>
      {navigateList.map((nav) => {
        const isSelected = pathname === nav.path;

        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className={cn(
                "w-8 h-8 border-4 border-lightest rounded-full bg-[#f9f9ff]",
                isSelected && "border-accent"
              )}
            ></div>
            <p
              className={cn(
                "text-[1rem] text-lighter",
                isSelected && "text-dark"
              )}
            >
              {nav.display}
            </p>
          </div>
        );
      })}
    </nav>
  );
}
