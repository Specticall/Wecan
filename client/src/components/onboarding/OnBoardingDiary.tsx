import DateDisplay from "../general/DateDisplay";

export default function OnBoardingDiary() {
  return (
    <div className="section flex-1 grid grid-cols-2 place-items-center py-12 gap-24">
      <div className="justify-self-start w-full ">
        <DateDisplay variant={"dark"} date={new Date()} />
        <h2 className="text-lg mt-2 mb-6">Write Your Diary</h2>
        <textarea
          placeholder="Dear Diary..."
          className="resize-none w-full rounded-md shadow-xl shadow-accent/5 p-8 h-[20rem]"
        ></textarea>
        <p className="text-end text-lighter mt-4">
          *You can create a diary once per day at any time
        </p>
      </div>
      <div>
        <p className="text-white bg-dark py-[0.125rem] px-4 rounded-full w-fit mb-8">
          Optional
        </p>
        <h1 className="text-xl max-w-[20rem] leading-[140%] mb-6">
          Keeping a diary is a good habbit.
        </h1>
        <p className="leading-[175%]  text-lighter ">
          Do you know that maintaining a diary is an effective method to stay
          connected with time, ourselves, and past events that may influence our
          life.
        </p>
      </div>
    </div>
  );
}
