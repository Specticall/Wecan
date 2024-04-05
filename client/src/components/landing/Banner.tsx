import ButtonArrow from "./ButtonArrow";

export default function Banner() {
  return (
    <section className="bg-white mt-24">
      <div className="section py-16">
        <h2 className="text-center text-xl font-semibold">
          What Are You Waiting For?
        </h2>
        <p className="text-center text-lighter mt-6">
          Get started today and invest in your mental wellness!
        </p>
        <ButtonArrow>Start My Journey</ButtonArrow>
      </div>
    </section>
  );
}
