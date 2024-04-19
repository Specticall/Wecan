import Button from "../general/Button";
import dashboardUI from "/assets/banner-dashboard.png";

export default function Banner() {
  return (
    <section className="bg-white pt-32">
      <div className="section bg-white-soft rounded-t-xl px-16 pt-20 flex flex-col items-center justify-center relative pb-40 overflow-hidden rounded-xl">
        <div className="bg-[#CED3FF] text-accent px-8 py-2 rounded-full">
          Let's Start
        </div>
        <h2 className="text-xl font-semibold max-w-[30rem] text-center mt-8">
          What Are You Waiting For? Get Started Today.
        </h2>
        <p className="text-light mt-6 max-w-[20rem] text-center leading-md">
          Investing time in your mental health will prove the be the best
          decision of your life
        </p>
        <Button className="mt-6">Get Started</Button>
        <img
          src={dashboardUI}
          className="absolute botom-0 translate-y-[28rem]"
        ></img>
      </div>
    </section>
  );
}
