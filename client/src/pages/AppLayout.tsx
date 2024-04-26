import AppNavbar from "@/components/app/navbar/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { userData } = useUser();
  const { showDialog } = useGlobalDialog();

  useEffect(() => {
    if (!userData || (userData && userData.hasSetMoodToday)) return;
    showDialog("newDay");
  }, [showDialog, userData]);

  // // TEMP
  // useEffect(() => {
  //   if (!userData) return;
  //   showDialog("goalPrize");
  // }, []);

  return (
    <DiaryProvider>
      <div className="">
        <AppNavbar />
        <Outlet />
      </div>
    </DiaryProvider>
  );
}
