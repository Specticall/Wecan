import DateDisplay from "@/components/general/DateDisplay";
import { Tooltip } from "@/components/general/Tooltip";
import { useDiary } from "@/context/DiaryContext";
import DiaryDetailsEmpty from "./DiaryDetailsEmpty";
import { ScrollArea } from "@/components/ui/scrollable";
import ProgressBar from "@/components/general/ProgressBar";
import Button from "@/components/general/Button";

export default function DiaryDetails() {
  const { selectedDiary } = useDiary();
  const progressPercent = selectedDiary
    ? (selectedDiary.earnedPoints * 100) / selectedDiary.targetPoints
    : 0;

  return (
    <div className="px-8 self-stretch pb-12">
      <Tooltip text="Task Completed" count={0} className="mb-6" />
      <article className="bg-white h-full flex flex-col">
        <header className="bg-accent rounded-md px-8 py-6 text-white">
          <h2 className="text-lg">Joseph's Diary</h2>
          {selectedDiary ? (
            <DateDisplay
              date={new Date(selectedDiary?.dateCreated)}
              variant="light"
              className="mt-2"
            />
          ) : (
            <div className="flex items-center justify-start gap-2 mt-2">
              <i className="bx bx-calendar-exclamation text-md"></i>
              <p>No Diary Selected</p>
            </div>
          )}
        </header>

        {selectedDiary ? (
          <div>
            <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="flex flex-col pt-12 pb-4 px-12">
                <div className="border-slate-400 p-8 border-[1px] rounded-md">
                  <p className="mb-6">Dear Diary,</p>
                  <p className="leading-[200%] text-light">
                    {selectedDiary.content}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className="mt-12 mb-1">
                    <p className="text-[0.75rem] text-black">
                      Wellness Points Earned
                    </p>
                    <h3 className="text-[2rem]">
                      {selectedDiary.earnedPoints.toLocaleString("de-DE")} pts
                    </h3>
                  </div>
                  <p className="font-semibold text-light text-lg self-end">{`${Math.round(
                    progressPercent
                  )}%`}</p>
                </div>
                <ProgressBar progressPercent={progressPercent} />
                <div className="flex justify-between items-center mt-2 text-light text-[0.75rem]">
                  <p>Your Progress</p>
                  <p>{selectedDiary.targetPoints.toLocaleString("de-DE")}</p>
                </div>
              </div>
            </ScrollArea>
            <div className="px-8">
              <Button variant="dark" className="w-full py-4 mt-8">
                View Completed Task
              </Button>
            </div>
          </div>
        ) : (
          <DiaryDetailsEmpty />
        )}
      </article>
    </div>
  );
}
