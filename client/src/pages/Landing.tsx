import { Hero } from "../components/landing/Hero";
import { Wave } from "../components/landing/Wave";
import { ApplicationFlow } from "../components/landing/ApplicationFlow";
import { Goals } from "./Goals";
import Banner from "@/components/landing/Banner";
import DashboardPreview from "@/components/landing/DashboardPreview";
import AboutUs from "@/components/landing/AboutUs";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <main className="mt-32 md:mt-24 ">
      <Hero />
      <DashboardPreview />
      <AboutUs />
      <HowItWorks />
      <FAQ />
      <Banner />
    </main>
  );
}
