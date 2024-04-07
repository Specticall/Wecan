import AppNavbar from "@/components/app/AppNavbar";
import { DiaryProvider } from "@/context/DiaryContext";
import { MoodProvider } from "@/context/MoodContext";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <MoodProvider>
      <DiaryProvider>
        <div className="grid grid-cols-[20rem_1fr] min-h-screen">
          <AppNavbar />
          <Outlet />
        </div>
      </DiaryProvider>
    </MoodProvider>
  );
}
