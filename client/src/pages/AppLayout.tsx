import AppNavbar from "@/components/app/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { userData } = useUser();
  const { showDialog } = useGlobalDialog();

  useEffect(() => {
    if (!userData) return;
    if (userData.unannouncedExpiredTaskCount > 0)
      showDialog("taskExpired", userData.unannouncedExpiredTaskCount);
  }, [showDialog, userData]);

  return (
    <DiaryProvider>
      <div className="grid grid-cols-[20rem_1fr] min-h-screen">
        <AppNavbar />
        <Outlet />
      </div>
    </DiaryProvider>
  );
}
