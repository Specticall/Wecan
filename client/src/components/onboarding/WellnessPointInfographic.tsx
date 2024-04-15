export default function WellnessPointInfographic() {
  return (
    <article className="bg-white p-12 rounded-md shadow-xl shadow-accent/5 justify-self-end">
      <h2 className="text-lg">What Are Wellness Points?</h2>
      <p className="text-lighter mt-2 max-w-[22.5rem] leading-[150%]">
        Wellness Point is a progress tracking tool that indicates whether you
        have achieved your goal.
      </p>
      <div className="grid grid-cols-[4.25rem_1fr] gap-x-4 mt-10">
        <i className="bx bx-coin-stack bg-background rouned-md text-dark row-span-2 flex items-center justify-center text-[2rem] aspect-square h-full"></i>
        <p className="mb-1">Collect</p>
        <p className=" max-w-[17.5rem] leading-[150%] text-lighter">
          Earn Wellness Points by completing certain tasks.
        </p>
      </div>
      <div className="grid grid-cols-[4.25rem_1fr] gap-x-4 mt-10">
        <i className="bx bx-line-chart bg-background rouned-md text-dark row-span-2 flex items-center justify-center text-[2rem] aspect-square h-full"></i>
        <p className="mb-1">Review</p>
        <p className=" max-w-[17.5rem] leading-[150%] text-lighter">
          Receive a report detailing effort you put into achieving your goal
        </p>
      </div>
    </article>
  );
}
