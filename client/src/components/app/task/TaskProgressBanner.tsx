import ProgressBar from "@/components/general/ProgressBar";
import useGoalMutation from "@/hooks/useGoalMutation";
import Skeleton from "react-loading-skeleton";

// top / bottom
function calcPercentage(numerator?: number, denomiator?: number) {
  if (!numerator || !denomiator) return undefined;
  return denomiator === 0 ? 0 : (numerator * 100) / denomiator;
}

export default function TaskProgressBanner() {
  const { goalData } = useGoalMutation();

  // This variable will be used in the `ProgressBar` component which has a `progressPercent` prop that triggers a loading skeleton state when the value passed in is `undefined`. As such this calc percentage function is catered around that behavior by returning undefined when goalData does not exist.
  const progressPercent = calcPercentage(goalData?.earned, goalData?.target);

  return (
    <article className="bg-white mt-4 rounded-lg p-8">
      <div className="flex items-center justify-between gap-4">
        {
          <h3 className="text-lg text-dark font-semibold">
            You have
            {goalData ? (
              <span> {(420_000).toLocaleString("de-DE")} </span>
            ) : (
              <Skeleton height={"1.5rem"} width={"7rem"} className="ml-4" />
            )}
            points to go!
          </h3>
        }
        <div className="whitespace-nowrap rounded-full px-6 py-2 bg-white-soft">
          Your Progress
        </div>
      </div>
      <p className="mt-4 text-light mb-8">
        You’re on your way to complete your goal, Keep going!
      </p>
      <ProgressBar progressPercent={progressPercent} />
      <div className="flex justify-between items-center gap-4 mt-2 text-light">
        {goalData ? (
          <>
            <p>{goalData.earned.toLocaleString("de-DE")} Points</p>
            <p>{goalData.target.toLocaleString("de-DE")} Points</p>
          </>
        ) : (
          <>
            <Skeleton height={"1rem"} width={"5rem"} />
            <Skeleton height={"1rem"} width={"5rem"} />
          </>
        )}
      </div>
    </article>
  );
}
