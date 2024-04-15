import { useState } from "react";
import { Slider } from "../ui/slider";

const MIN_POINTS = 50000;
const MAX_POINTS = 500000;
const DEFAULT_POINTS = 150000;

const difficultyRange = [
  { difficulty: "Easy", min: 50000, max: 150000, color: "rgb(42 157 143)" },
  { difficulty: "Medium", min: 200000, max: 350000, color: "rgb(74 90 239)" },
  { difficulty: "Hard", min: 40000, max: 500000, color: "rgb(231 111 81)" },
] as const;

type TDifficulty = (typeof difficultyRange)[number];

const findDifficulty = (point: number) => {
  const range = difficultyRange.find(
    (range) => range.min <= point && point <= range.max
  );
  if (!range) throw new Error(`No difficulty from ${point} points was found`);
  return range;
};

export default function GoalSlider() {
  const [point, setPoint] = useState(DEFAULT_POINTS);
  const [{ difficulty, color }, setDifficulty] = useState<TDifficulty>(() =>
    findDifficulty(DEFAULT_POINTS)
  );

  const handleValueChange = (val: number[]) => {
    const value = val[0];
    const difficulty = findDifficulty(value);

    setPoint(value);
    setDifficulty(difficulty);
  };

  return (
    <>
      <div className="flex items-center mt-8">
        <i className="bx bx-coin-stack text-[2rem] text-dark"></i>
        <p className="text-md text-darkest ml-2 mr-4">
          {point.toLocaleString("de-DE")} Points
        </p>
        <p
          className="bg-accent px-5 py-1 rounded-full text-white transition-all duration-200"
          style={{ background: color }}
        >
          {difficulty}
        </p>
      </div>
      <Slider
        className="mt-6"
        step={MIN_POINTS}
        max={MAX_POINTS}
        min={MIN_POINTS}
        defaultValue={[DEFAULT_POINTS]}
        onValueChange={handleValueChange}
      />
      <div className="flex justify-between text-lighter mt-4">
        <p>50.000</p>
        <p>500.000</p>
      </div>
    </>
  );
}
