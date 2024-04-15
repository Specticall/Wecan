import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useGoalMutation from "@/hooks/useGoalMutation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Slider } from "../ui/slider";

const MIN_POINTS = 50000;
const MAX_POINTS = 500000;
const DEFAULT_POINTS = 150000;

const difficultyRange = [
  { difficulty: "Easy", min: 50000, max: 150000, color: "rgb(42 157 143)" },
  { difficulty: "Medium", min: 200000, max: 350000, color: "rgb(74 90 239)" },
  { difficulty: "Hard", min: 40000, max: 500000, color: "rgb(231 111 81)" },
] as const;

const findDifficulty = (point: number) => {
  const range = difficultyRange.find(
    (range) => range.min <= point && point <= range.max
  );
  if (!range) throw new Error(`No difficulty from ${point} points was found`);
  return range;
};

export default function GoalSlider() {
  const { goalData, updateMutation, goalQuery } = useGoalMutation();

  /*
  We're debouncing here because when a user drags the slider around, every single time the value change a request would be fired off so to mitigate that we debounce to value meaning it will now only a send a request if the user stops dragging for 300ms.
  */
  const [value, setValue] = useState(goalData?.target || DEFAULT_POINTS);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    // Prevents the effect from running when no data has been fetched yet.
    if (!goalData) return;
    updateMutation.mutate({ target: debouncedValue });
  }, [debouncedValue]);

  // Finds the difficulty value and color for a given target point data
  const difficultyRange = goalData && findDifficulty(goalData.target);

  const handleValueChange = (val: number[]) => {
    const value = val[0];
    setValue(value);
  };

  // When the user switches between pages, there will be a short time frame needed where the app fetches stale data from the server causing a flash of outdated values, to fix this we simply create a derived state that tracks if the app is making a refetch request which we can use to display a skeleton loader.
  const isRefetchingData = goalQuery.isRefetching;

  // TEMP
  if (!goalData) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center mt-8">
        <i className="bx bx-coin-stack text-[2rem] text-dark"></i>
        <p className="text-md text-darkest ml-2 mr-4">
          {goalData?.target.toLocaleString("de-DE") || <Skeleton />} Points
        </p>
        {difficultyRange ? (
          <p
            className="bg-accent px-5 py-1 rounded-full text-white transition-all duration-200"
            style={{ background: difficultyRange.color }}
          >
            {difficultyRange.difficulty}
          </p>
        ) : (
          <Skeleton />
        )}
      </div>
      {isRefetchingData ? (
        <Skeleton height={"0.375rem"} width={"100%"} className="mt-6" />
      ) : (
        <Slider
          className="mt-6"
          step={MIN_POINTS}
          // Controlled components using a remove optimistically updated data source
          value={[value]}
          max={MAX_POINTS}
          min={MIN_POINTS}
          defaultValue={[DEFAULT_POINTS]}
          onValueChange={handleValueChange}
        />
      )}
      <div className="flex justify-between text-lighter mt-4">
        <p>50.000</p>
        <p>500.000</p>
      </div>
    </>
  );
}
