import stepOneIllustration from "/assets/home-step1.png";
import stepTwoIllustration from "/assets/home-step2.png";

export function ApplicationFlow() {
  return (
    <section className="relative section mt-24 md:mt-0">
      <div className="absolute top-[12rem] bottom-[11rem] translate-x-[3px] bg-darkest w-[1px] lg:hidden"></div>
      <h2 className="text-center text-xl md:text-[2rem] mb-4">
        How Our Application <span className="text-accent">Works?</span>
      </h2>
      <p className="text-center text-lighter mt-2">
        The following are ways that our application can you with your mental
        well being
      </p>
      <div className="grid grid-cols-[2rem_1fr_1fr] lg:grid-cols-1  mt-24 gap-y-12">
        <div className="w-2 aspect-square bg-darkest rounded-full mt-3 lg:hidden"></div>
        <article className="flex flex-col items-start lg:px-0 px-4">
          <p className="text-lg text-lighter">01</p>
          <h3 className="text-lg max-w-[20rem] mt-2">
            Participate in activities that boost your mood.
          </h3>
          <p className="text-lighter max-w-[27.5rem] leading-[200%] mt-4">
            Discover researched activities proven to boost your mood. Completing
            them earns wellness points, tracking your progress.
          </p>
        </article>
        <img
          src={stepOneIllustration}
          alt="step one illustration"
          className="w-[80%] justify-self-center shadow-lg lg:justify-self-start lg:w-full"
        />
        <div className="w-2 aspect-square bg-darkest rounded-full mt-3 lg:hidden"></div>
        <article className="flex flex-col items-start lg:px-0 px-4">
          <p className="text-lg text-lighter ">02</p>
          <h3 className="text-lg max-w-[25rem] mt-2">
            Earn points and track how well you are treating yourself.
          </h3>
          <p className="text-lighter max-w-[30rem] leading-[200%] mt-4">
            Your task completion translates into points that indicates your
            focus on self-care using a measurable scale, wellness points.
          </p>
        </article>
        <img
          src={stepTwoIllustration}
          alt="step one illustration"
          className="w-[80%] justify-self-center shadow-lg shadow-accent/10  lg:w-full"
        />
      </div>
    </section>
  );
}
