import { TMood } from "@/context/MoodContext";
import { getMoodColor } from "@/lib/utils";
import MoodDropdown from "../moodModal/MoodDropdown";
import { useState } from "react";

export default function DiaryFormMoodSelector({
  onChange,
}: {
  onChange: (value: TMood | undefined) => void;
}) {
  const [selectedMood, setSelectedMood] = useState<TMood | undefined>(
    undefined
  );
  return (
    <div
      className="flex items-center justify-between gap-5 py-6 bg-accent rounded-md px-6 mb-4"
      style={
        selectedMood
          ? {
              backgroundColor: getMoodColor(selectedMood),
            }
          : undefined
      }
    >
      <i
        className="bx bx-happy text-xl p-2 rounded-full bg-white text-accent"
        style={
          selectedMood
            ? {
                color: getMoodColor(selectedMood),
              }
            : undefined
        }
      ></i>
      <div className="flex-1">
        <p className="text-lightest">My Mood Right Now</p>
        <h2 className="text-md text-white">{selectedMood || "Unknown"}</h2>
      </div>
      <MoodDropdown
        onSetMood={(mood) => {
          setSelectedMood(mood);
          onChange(mood);
        }}
        defaultValue={selectedMood}
      />
    </div>
  );
}
