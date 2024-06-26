import DateDisplay from "@/components/general/DateDisplay";
import ProgressBar from "@/components/general/ProgressBar";
import { Tooltip } from "@/components/general/Tooltip";
import { ScrollArea } from "@/components/ui/scrollable";
import { useDiary } from "@/context/DiaryContext";
import { cn, getMoodColor, truncateText } from "@/lib/utils";
import EmptyDiaryList from "./EmptyDiaryList";

const TEXT_TRUNCATE_LENGTH = 75;

// DEPRECATED -> Waiting for deletion once the component is confirmed to be no longer used.

// List of diaries the user has created.
export default function DiaryList() {
  const { diaryList, selectDiaryById, selectedDiary } = useDiary();

  const handleSelect = (id: string) => () => selectDiaryById(id);

  if (!diaryList) return;

  return (
    <ul className="">
      <Tooltip text="Completed" count={diaryList.length} className="mb-4" />
      <ScrollArea className="h-[calc(100vh-10.5rem)]">
        {diaryList.length === 0 && <EmptyDiaryList />}
        <div className="grid grid-cols-2 gap-8 items-start pr-8 pt-4  content-start auto-rows-fr">
          {diaryList.map((diary) => {
            const isSelected = selectedDiary?.id === diary.id;
            const progressPercent =
              (diary.earnedPoints * 100) / diary.targetPoints;
            return (
              <>
                <article
                  key={diary.id}
                  className={cn(
                    "bg-white rounded-lg p-8 shadow-lg shadow-accent/10 relative cursor-pointer transition-all duration-100 hover:scale-[0.95]",
                    isSelected && "bg-accent"
                  )}
                  onClick={handleSelect(diary.id)}
                >
                  <div
                    className="w-8 aspect-square rounded-full right-[-1rem] top-[-0.5rem] absolute"
                    style={{
                      backgroundColor: getMoodColor(diary.mood),
                    }}
                  ></div>
                  <DateDisplay
                    date={new Date(diary.dateCreated)}
                    className="mb-6"
                    variant={isSelected ? "light" : "dark"}
                  />
                  <p
                    className={cn(
                      "text-wrap mb-8 text-lighter leading-6",
                      isSelected && "text-lightest"
                    )}
                  >
                    {truncateText(diary.content, TEXT_TRUNCATE_LENGTH)}
                  </p>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p
                        className={cn(
                          "text-[0.75rem] text-black",
                          isSelected && "text-white"
                        )}
                      >
                        Wellness Points Earned
                      </p>
                      <p
                        className={cn("font-semibold text-light", "text-white")}
                      >{`${Math.round(progressPercent)}%`}</p>
                    </div>
                    <ProgressBar
                      progressPercent={progressPercent}
                      variant={isSelected ? "dark" : "light"}
                    />
                    <div
                      className={cn(
                        "flex justify-between items-center mt-2 text-light text-[0.75rem]",
                        isSelected && "text-lightest"
                      )}
                    >
                      <p>Your Progress</p>
                      <p>{diary.targetPoints.toLocaleString("de-DE")}</p>
                    </div>
                  </div>
                </article>
              </>
            );
          })}
        </div>
      </ScrollArea>
    </ul>
  );
}
