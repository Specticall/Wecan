import AppNavbar from "@/components/app/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { expiredTaskCount } = useTaskMutation();
  const { showDialog } = useGlobalDialog();

  useEffect(() => {
    if (expiredTaskCount <= 0) return;
    showDialog("taskExpired", expiredTaskCount);
  }, []);

  return (
    <DiaryProvider>
      <div className="grid grid-cols-[20rem_1fr] min-h-screen">
        <AppNavbar />
        <Outlet />
      </div>
    </DiaryProvider>
  );
}
