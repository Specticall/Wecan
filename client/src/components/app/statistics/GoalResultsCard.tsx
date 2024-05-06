import GoalCard from "./GoalCard";

// Decorative component that displays the user's goal target.
export default function GoalResultsCard() {
  return (
    <article className="bg-white rounded-2xl p-8 3xl:p-6">
      <h2 className="text-lg text-dark">Goal Results</h2>
      <p className="text-light leading-md mt-2">
        You can view your results once you have completed your goal point
        requirements
      </p>
      <GoalCard />
    </article>
  );
}
