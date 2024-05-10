import heroGradient from "/assets/hero-gradient.png";
import GoogleLoginButton from "../auth/GoogleLoginButton";

export function Hero() {
  return (
    <section className="section pb-6" id="hero">
      <img
        src={heroGradient}
        alt="hero Gradient"
        className="absolute top-0 left-0 right-0 w-screen z-[-1]"
      />
      <div className="bg-white rounded-full w-fit px-6 py-2 mx-auto">
        Hi There Welcome 👋
      </div>
      <h1 className="text-center text-2xl font-semibold max-w-[60rem] mx-auto mt-6 lg:text-[3rem] md:text-xl leading-[130%]">
        Prioritizing Mental Well Being Leads to a Happier Life.{" "}
      </h1>
      <p className="text-light mx-auto max-w-[40rem] leading-lg text-center mt-8">
        Together with Wecan, we're dedicated to supporting your mental health
        journey through engaging activities designed to promote well-being.
      </p>
      <div className="flex flex-col items-center mt-8">
        <GoogleLoginButton>Get Started</GoogleLoginButton>
      </div>
    </section>
  );
}
