import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

export default function BarChart<
  T extends number,
  V extends { item: string; value: T }
>({ yAxis, xAxis, className }: { yAxis: T[]; xAxis: V[]; className?: string }) {
  const [prevHover, setPrevHover] = useState<V | undefined>();
  const [hovering, setHovering] = useState<V | undefined>();

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const width = "10rem";
  const maxValue = yAxis[0];

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr] gap-y-2 grid-rows-[1fr_auto]",
        className
      )}
    >
      <CustomCursor>
        <div
          className="bg-dark text-white rounded-md px-4 py-2 "
          style={{
            transition: "scale 0.2s",
            scale: hovering ? "1" : "0",
          }}
        >
          {`${(hovering?.value || prevHover?.value || "").toLocaleString(
            "de-DE"
          )} Points` || ""}
        </div>
      </CustomCursor>
      {/* Y-AXIS ITEMS */}
      <ul className="flex flex-col justify-between items-end ">
        {yAxis.map((item) => (
          <li className="text-light" key={item}>
            {item.toLocaleString("de-DE")}
          </li>
        ))}
      </ul>

      {/* BAR CONTENT */}
      <div className="relative ">
        {/* BARS */}
        <div
          className="flex justify-between px-8 gap-4 relative z-[2] h-full w-full"
          style={{ gridTemplateColumns: `repeat(${xAxis.length}, 1fr)` }}
        >
          {xAxis.map((item) => {
            const OFFSET_PERCENT = 0;

            const heightLevel = item.value / maxValue;

            const heightPercentage = Math.floor(heightLevel * 100);

            const cellColor = "#5A54F4";
            return (
              <div
                key={item.item}
                className="w-full origin-bottom bar-element transition-all duration-300 rounded-xl self-end h-0 relative cursor-pointer hover:opacity-80"
                style={{
                  maxWidth: width,
                  backgroundColor: cellColor,
                  color: "transparent",
                  height: shouldAnimate
                    ? `${heightPercentage - OFFSET_PERCENT}%`
                    : "0%",
                }}
                onMouseOver={() => setHovering(item)}
                onMouseOut={() => {
                  setHovering(undefined);
                  setPrevHover(item);
                }}
              ></div>
            );
          })}
        </div>

        {/* BAR BACKGROUND */}
        <div
          className="flex justify-between px-8 gap-4 z-[1] h-full w-full absolute inset-0"
          style={{ gridTemplateColumns: `repeat(${xAxis.length}, 1fr)` }}
        >
          {xAxis.map((item) => {
            return (
              <div
                key={item.item}
                className="w-full origin-bottom bar-element transition-all duration-300 rounded-xl self-end h-0 relative bg-white-soft"
                style={{
                  maxWidth: width,
                  color: "transparent",
                  height: shouldAnimate ? `100%` : "0%",
                }}
              ></div>
            );
          })}
        </div>
        {/* GRID LINES */}
        {/* <div
          className="absolute inset-0 ml-4 flex flex-col justify-between"
          style={{ gridTemplateRows: `repeat(${yAxis.length}, 1fr)` }}
        >
          {yAxis.map(() => {
            return <div className="bg-border w-full h-[1px]"></div>;
          })}
        </div> */}
      </div>
      <div></div>

      {/* X-AXIS Items */}
      <ul
        className="flex place-items-center justify-between gap-4 h-fit px-8 "
        style={{ gridTemplateColumns: `repeat(${xAxis.length}, 1fr)` }}
      >
        {xAxis.map((content) => {
          return (
            <li
              key={`${content.item}${content.value}`}
              className="text-lighter flex items-center justify-center  w-full"
              style={{ maxWidth: width }}
            >
              {content.item}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
