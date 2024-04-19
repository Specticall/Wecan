import heroGradient from "/assets/hero-gradient.png";
import Button from "../general/Button";

export function Hero() {
  return (
    <section className="section overflow-hidden pb-6 ">
      <img
        src={heroGradient}
        alt="hero Gradient"
        className="absolute top-0 left-0 right-0 w-screen z-[-1]"
      />
      <div className="bg-white rounded-full w-fit px-6 py-2 mx-auto">
        Hi There Welcome 👋
      </div>
      <h1 className="text-center text-2xl font-semibold max-w-[60rem] mx-auto mt-6">
        Prioritizing Mental Well Being Leads to a Happier Life.{" "}
      </h1>
      <p className="text-light mx-auto max-w-[40rem] leading-lg text-center mt-8">
        Together with Wecan, we're dedicated to supporting your mental health
        journey through engaging activities designed to promote well-being.
      </p>
      <div className="flex flex-col items-center">
        <Button className="mt-12">Get Started</Button>
      </div>
    </section>
  );
}
