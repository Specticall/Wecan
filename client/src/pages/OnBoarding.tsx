import OnBoardingNavigation from "@/components/onboarding/OnBoardingNavigation";
import OnboardingNavigator from "@/components/onboarding/OnBoardingNavigator";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const { userData } = useUser();
  const navigate = useNavigate();

  // Only allows first time users to access to page.
  useEffect(() => {
    if (!userData?.hasOnboarded) return;
    navigate("/app/dashboard");
  }, [userData, navigate]);

  if (!userData) return;
  return (
    <main className="flex flex-col w-full [&>*]:w-full h-screen">
      <OnBoardingNavigation />
      <Outlet />
      <OnboardingNavigator />
    </main>
  );
}
