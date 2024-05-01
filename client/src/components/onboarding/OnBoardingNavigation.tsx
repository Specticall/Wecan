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
    <nav className="relative flex justify-between items-center mt-4 mb-8 max-w-[24rem] mx-auto w-full">
      <div className="absolute left-12 right-12 top-[20%] h-[2px]  bg-white-soft"></div>
      {navigateList.map((nav) => {
        const isSelected = pathname === nav.path;

        return (
          <div className="flex flex-col items-center justify-center gap-2 relative z-[1]">
            <div
              className={cn(
                "w-6 h-6 border-2 border-lightest rounded-full bg-white",
                isSelected && "border-accent"
              )}
            ></div>
            <p className={cn("text-lighter", isSelected && "text-dark")}>
              {nav.display}
            </p>
          </div>
        );
      })}
    </nav>
  );
}
