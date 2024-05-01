import { TMood } from "@/context/MoodContext";
import { cn, getMoodColor } from "@/lib/utils";
import { useState } from "react";

const moods = ["Ecstatic", "Happy", "Neutral", "Sad", "Depressed"] as const;

export default function MoodSelectorSlide({
  className,
  onSelect = () => {},
  defaultValue,
}: {
  className?: string;
  onSelect?: (mood: TMood | undefined) => void;
  defaultValue: TMood | undefined;
}) {
  const [selected, setSelected] = useState<(typeof moods)[number] | undefined>(
    defaultValue
  );

  const handleSelect = (mood: TMood) => () => {
    setSelected((current) => (current === mood ? undefined : mood));
    onSelect(selected === mood ? undefined : mood);
  };
  return (
    <ul className={cn("flex gap-6", className)}>
      {moods.map((mood) => {
        const moodColor = getMoodColor(mood).slice(4, -1).split(" ").join(",");
        const shadowColor = `rgba(${moodColor},0.2)`;
        const isSelected = selected === mood;
        return (
          <li
            className="flex flex-col items-center justify-center group cursor-pointer gap-4"
            onClick={handleSelect(mood)}
          >
            <div
              className={cn(
                "w-[4rem] aspect-square rounded-full relative z-10 group-hover:scale-[1.15] transition-all duration-300",
                isSelected && "scale-[1.15]"
              )}
              style={{
                background: getMoodColor(mood),
                boxShadow: isSelected
                  ? `0 0.5rem 1rem 0.25rem ${shadowColor}`
                  : "",
              }}
            ></div>
            <p
              className={cn(
                "text-light font-semibold translate-y-[-3.5rem] group-hover:translate-y-[0] group-hover:scale-100 scale-0 transition-all duration-300",
                isSelected && "translate-y-[0] scale-100"
              )}
            >
              {mood}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
