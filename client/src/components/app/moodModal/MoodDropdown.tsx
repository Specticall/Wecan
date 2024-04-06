import {
  Dropdown,
  DropdownContent,
  DropdownDecoration,
  DropdownItem,
  DropdownTrigger,
} from "@/components/general/Dropdown";
import { TMood } from "@/context/MoodContext";
import { getMoodColor } from "@/lib/utils";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const moodList = [
  {
    mood: "Ecstatic",
    icon: "",
  },
  {
    mood: "Happy",
    icon: "",
  },
  {
    mood: "Neutral",
    icon: "",
  },
  {
    mood: "Sad",
    icon: "",
  },
  {
    mood: "Depressed",
    icon: "",
  },
];

const triggerVariant = {
  dark: "border-dark text-dark hover:bg-dark/5",
  light: "border-white text-white hover:bg-white/10",
};

export default function MoodDropdown({
  triggerColor,
  onSetMood,
  defaultValue,
}: {
  triggerColor?: keyof typeof triggerVariant;
  onSetMood: (selectedMood: TMood | undefined) => void;
  defaultValue?: TMood;
}) {
  return (
    <Dropdown
      defaultValue={defaultValue}
      onSelect={(selected) => onSetMood(selected as TMood | undefined)}
    >
      <DropdownTrigger
        className={twMerge(
          clsx(
            "px-6 py-2 border-white border-[1px] rounded-full text-white flex items-center justify-center gap-2 cursor-pointer  transition-bg duration-75",
            triggerColor && triggerVariant[triggerColor]
          )
        )}
      >
        Change <i className="bx bx-chevron-down text-md"></i>
      </DropdownTrigger>
      <DropdownContent className="w-[14rem] shadow-lg shadow-accent/10 rounded-md">
        <DropdownDecoration>
          <h3 className="font-semibold border-b-[1px] border-lightest pb-2">
            Moods
          </h3>
        </DropdownDecoration>
        {moodList.map((mood) => {
          return (
            <DropdownItem
              className="flex items-center justify-start gap-3"
              itemValue={mood.mood}
            >
              <div
                className="w-4 aspect-square bg-accent rounded-full"
                style={{
                  backgroundColor: getMoodColor(mood.mood as TMood),
                }}
              ></div>
              <p>{mood.mood}</p>
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
}
