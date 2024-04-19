import graph from "/assets/about-us-graph.png";

export default function AboutUs() {
  return (
    <section className="bg-white">
      <div className="section flex gap-12 items-center justify-center pb-32 py-48">
        <article className="flex flex-col items-start">
          <div className="bg-white-soft px-8 py-2 rounded-full text-dark">
            About Us
          </div>
          <h1 className="mt-8 text-xl font-semibold">
            Your Mental Health, Our{" "}
            <span className="text-[#7272FF]">Responsiblity.</span>{" "}
          </h1>
          <p className="mt-10 leading-lg text-light">
            At Wecan, we hold the firm belief that mental health stands as a
            cornerstone of every individual's well-being. Unfortunately, society
            often overlooks this vital aspect. As such, we have made it our
            mission to enhancing your mental health through our application.
          </p>
        </article>
        <img src={graph} alt="Graph" className="w-[35rem]" />
      </div>
    </section>
  );
}
