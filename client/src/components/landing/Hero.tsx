import Icons from "@/components/general/Icon";
import ButtonArrow from "./ButtonArrow";
import DateDisplay from "../general/DateDisplay";

export function Hero() {
  return (
    <section className="section overflow-hidden pb-6">
      <DateDisplay className="justify-center mb-4" />
      <h1 className="font-semibold text-2xl text-darkest text-center max-w-[50rem] mx-auto leading-[125%] md:text-[2.5rem] whitespace-break-spaces">
        Welcome Back,
        <span className="text-accent relative">
          Joseph!{" "}
          <div className="absolute top-[-2.75rem] right-[-4.4rem] md:hidden">
            <Icons icon="heroDecoration" />
          </div>
        </span>
        How's Your Day Today?
      </h1>
      <ButtonArrow>Start My Journey</ButtonArrow>
    </section>
  );
}
