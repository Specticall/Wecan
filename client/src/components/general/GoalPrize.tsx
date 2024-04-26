import GoalCard from "../app/statistics/GoalCard";

export default function GoalPrize() {
  return (
    <article className="bg-white p-12 grid grid-cols-2 gap-2 rounded-lg">
      <div>
        <h2 className="text-[1.75rem] text-dark font-semibold mb-2">
          Congratulations on Completing Your Goal!
        </h2>
        <p className="text-light leading-md">
          Congratulations on reaching your points! Keep pushing forward with
          passion and persistence!
        </p>
        <GoalCard className="mt-8" />
      </div>
    </article>
  );
}
