import AppNavbar from "@/components/app/navbar/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

// Entry point for teh `/app` route
export default function AppLayout() {
  const { userData } = useUser();
  const { showDialog } = useGlobalDialog();

  // Show the newDay dialog when the user logs in for the first time in a day
  useEffect(() => {
    if (!userData || (userData && userData.hasSetMoodToday)) return;
    showDialog("newDay");
  }, [showDialog, userData]);

  return (
    <DiaryProvider>
      <div className="flex flex-col min-h-screen lg:min-h-0 overflow-x-hidden">
        <AppNavbar />
        <Outlet />
      </div>
    </DiaryProvider>
  );
}
