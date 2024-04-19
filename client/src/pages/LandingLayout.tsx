import { Footer } from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
