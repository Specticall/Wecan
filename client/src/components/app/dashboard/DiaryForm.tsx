import { useMood } from "@/context/MoodContext";
import MoodDropdown from "../moodModal/MoodDropdown";
import { getMoodColor } from "@/lib/utils";
import Button from "@/components/general/Button";

export default function DiaryForm() {
  const { currentMood } = useMood();

  return (
    <form className="bg-white shadow-lg rounded-lg shadow-accent/10">
      <header className="bg-accent px-8 py-8 rounded-lg">
        <div className="flex gap-2 items-center mb-1">
          <i className="bx bx-message-rounded-dots text-lightest text-md"></i>
          <p className="text-lightest">Daily Journay</p>
        </div>
        <h2 className="text-lightest text-md mb-4">How's your day today?</h2>
        <div className="flex items-center justify-start gap-3">
          <div className="px-4 py-1 rounded-full bg-darkest text-white">
            43 Days
          </div>
          <div className="text-white flex items-center gap-1">
            <i className="bx bxs-flame text-md"></i>
            <p>Streak</p>
          </div>
        </div>
      </header>
      <div className="px-8 pt-6 pb-2 rounded-lg">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 text-dark">
            <i className="bx bx-pencil text-md"></i>
            <p>Anything Happened Today?</p>
          </div>
          <textarea
            placeholder="Dear Diary, Today I..."
            className="w-full h-40 border-[1px] px-6 py-4 border-border rounded-md resize-none"
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <i className="bx bx-wink-smile text-md"></i>
          <p className="text-dark">How are you feeling?</p>
        </div>
        <div
          className="flex items-center justify-between gap-5 py-6 bg-accent rounded-md px-6 mb-6"
          style={
            currentMood
              ? {
                  backgroundColor: getMoodColor(currentMood),
                }
              : undefined
          }
        >
          <i
            className="bx bx-happy text-xl p-2 rounded-full bg-white text-accent"
            style={
              currentMood
                ? {
                    color: getMoodColor(currentMood),
                  }
                : undefined
            }
          ></i>
          <div className="flex-1">
            <p className="text-lightest">My Mood Right Now</p>
            <h2 className="text-md text-white">{currentMood || "Unknown"}</h2>
          </div>
          <MoodDropdown />
        </div>
      </div>
      <div className="flex flex-col items-start px-8 pb-6 border-t-[1px] border-border pt-6 ">
        <div className="flex-1"></div>
        <Button
          variant="dark"
          className="py-2 flex items-center justify-center gap-2"
        >
          Save
          <i className="bx bxs-send text-lightest text"></i>
        </Button>
      </div>
    </form>
  );
}
