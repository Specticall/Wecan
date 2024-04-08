import AppNavbar from "@/components/app/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <DiaryProvider>
      <div className="grid grid-cols-[20rem_1fr] min-h-screen">
        <AppNavbar />
        <Outlet />
      </div>
    </DiaryProvider>
  );
}
