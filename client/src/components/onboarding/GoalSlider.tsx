import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

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

/**
 * Component that allows the user to set their wellness points goal using a slider interface. This slider has a callback that is called whenever the value is changed. This is because sliders become unresponsive and janky when they are used inconjuction with mutation directly. Optimistic updates also have alot of caveats we need to overcame. Which is why this callback pattern if best for the `GoalSlider` component.
 *
 */
export default function GoalSlider({
  onChange = () => {},
  defaultValue = DEFAULT_POINTS,
  className,
}: {
  onChange: (value: number) => void;
  defaultValue?: number;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue || DEFAULT_POINTS);

  // Finds the difficulty value and color for a given target point data
  const difficultyRange = findDifficulty(value);

  const handleValueChange = (val: number[]) => {
    const value = val[0];
    onChange(value);
    setValue(value);
  };

  return (
    <>
      <div className={cn("flex items-center", className)}>
        <i className="bx bx-coin-stack text-[2rem] text-dark"></i>
        <p className="text-md text-darkest ml-2 mr-4">
          {value.toLocaleString("de-DE") || <Skeleton />} Points
        </p>
        <p
          className="bg-accent px-5 py-1 rounded-full text-white transition-all duration-200"
          style={{ background: difficultyRange.color }}
        >
          {difficultyRange.difficulty}
        </p>
      </div>
      {/* Shadcn slider component */}
      <Slider
        className="mt-6"
        step={MIN_POINTS}
        value={[value]}
        max={MAX_POINTS}
        min={MIN_POINTS}
        defaultValue={[DEFAULT_POINTS]}
        // Retrieves data from the slider through the callback.
        onValueChange={handleValueChange}
      />
      <div className="flex justify-between text-lighter mt-4">
        <p>50.000</p>
        <p>500.000</p>
      </div>
    </>
  );
}
