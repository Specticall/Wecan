import { Footer } from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Outlet } from "react-router-dom";

// Layout for the landing page. Used so that the Navbar and Footer are always present.
// This component will also allow us to easily add new landing page components in the future.
export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
