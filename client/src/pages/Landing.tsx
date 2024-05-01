import { Hero } from "../components/landing/Hero";
import Banner from "@/components/landing/Banner";
import DashboardPreview from "@/components/landing/DashboardPreview";
import AboutUs from "@/components/landing/AboutUs";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";

// Entry point for the `/home/landing` route. Responsible for constructing the landing page.
export default function Home() {
  return (
    <main className="pt-32 md:pt-24 overflow-x-hidden">
      <Hero />
      <DashboardPreview />
      <AboutUs />
      <HowItWorks />
      <FAQ />
      <Banner />
    </main>
  );
}
