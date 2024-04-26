import GoalCard from "./GoalCard";

export default function GoalResultsCard() {
  return (
    <article className="bg-white rounded-2xl p-8">
      <h2 className="text-lg text-dark">Goal Results</h2>
      <p className="text-light leading-md mt-2">
        You can view your results once you have completed your goal point
        requirements
      </p>
      <GoalCard />
    </article>
  );
}
