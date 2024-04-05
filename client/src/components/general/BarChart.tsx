import { getMoodColor } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BarChart<
  T extends string,
  V extends { item: string; value: T }
>({ yAxis, xAxis }: { yAxis: T[]; xAxis: V[] }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return (
    <article className="grid grid-cols-[auto_1fr] gap-y-2">
      <div className="">
        <ul className="flex flex-col justify-start items-end">
          {yAxis.map((item) => (
            <li className="pb-4 text-light">{item}</li>
          ))}
          <li className="opacity-0 pb-4">DUMMY</li>
        </ul>
      </div>
      <div className="relative">
        <div
          className="grid place-items-center px-8 gap-x-8  relative z-[1] h-full w-full"
          style={{ gridTemplateColumns: `repeat(${xAxis.length}, 1fr)` }}
        >
          {xAxis.map((item) => {
            const OFFSET_PERCENT = 0;
            const heightLevel =
              yAxis.length + 1 - yAxis.indexOf(item.value) - 1;
            const heightPercentage = Math.floor(
              ((heightLevel + 1) * 100) / (yAxis.length + 1)
            );
            const cellColor = getMoodColor(item.value);
            return (
              <div
                className="h-full w-full origin-bottom bar-element transition-all duration-300"
                style={{
                  backgroundColor: cellColor,
                  color: cellColor,
                  transform: shouldAnimate
                    ? `scaleY(${heightPercentage - OFFSET_PERCENT}%)`
                    : "scaleY(0)",
                }}
              >
                X
              </div>
            );
          })}{" "}
        </div>
        <div
          className="absolute inset-0 ml-4"
          style={{ gridTemplateRows: `repeat(${yAxis.length}, 1fr)` }}
        >
          {yAxis.map(() => {
            return (
              <div className="pb-4 border-t-[1px] border-lightest/50 text-transparent">
                x
              </div>
            );
          })}
          <div className="pb-4 border-t-[1px] border-lightest/50 text-transparent">
            x
          </div>
        </div>
      </div>
      <div></div>
      <ul
        className="grid place-items-center gap-8 px-8"
        style={{ gridTemplateColumns: `repeat(${xAxis.length}, 1fr)` }}
      >
        {xAxis.map((content) => {
          return <li className="text-lighter">{content.item}</li>;
        })}
      </ul>
    </article>
  );
}
