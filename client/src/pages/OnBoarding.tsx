import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Entry point for the user's onboarding process (first time users)
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
