import OnBoardingNavigation from "@/components/onboarding/OnBoardingNavigation";
import OnboardingNavigator from "@/components/onboarding/OnBoardingNavigator";
import { PaginationProvider } from "@/context/PaginationContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const routes = [
  "/onboarding/step-1",
  "/onboarding/step-2",
  "/onboarding/step-3",
];

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
    <main className="w-full grid grid-cols-1 gap-12 min-h-screen bg-white p-6">
      <article className="flex flex-col ">
        <Outlet />
      </article>
    </main>
  );
}
