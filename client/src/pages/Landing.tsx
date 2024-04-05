import { Hero } from "../components/landing/Hero";
import { Wave } from "../components/landing/Wave";
import { ApplicationFlow } from "../components/landing/ApplicationFlow";
import { Goals } from "./Goals";
import Banner from "@/components/landing/Banner";

export default function Home() {
  return (
    <main className="mt-32 md:mt-24">
      <Hero />
      <Wave />
      <ApplicationFlow />
      <Goals />
      <Banner />
    </main>
  );
}
