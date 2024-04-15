import OnBoardingNavigation from "@/components/onboarding/OnBoardingNavigation";
import OnboardingNavigator from "@/components/onboarding/OnBoardingNavigator";
import { Outlet } from "react-router-dom";

export default function OnBoarding() {
  return (
    <main className="flex flex-col w-full [&>*]:w-full h-screen">
      <OnBoardingNavigation />
      <Outlet />
      <OnboardingNavigator />
    </main>
  );
}
