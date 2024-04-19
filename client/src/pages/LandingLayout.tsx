import { Footer } from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
