import DateDisplay from "@/components/general/DateDisplay";
import ProgressBar from "@/components/general/ProgressBar";
import { Tooltip } from "@/components/general/Tooltip";
import { ScrollArea } from "@/components/ui/scrollable";
import { useDiary } from "@/context/DiaryContext";
import { TMood } from "@/context/MoodContext";
import { cn, getMoodColor, truncateText } from "@/lib/utils";

const TEXT_TRUNCATE_LENGTH = 75;

export default function DiaryList() {
  const { diaryList, selectDiaryById, selectedDiary } = useDiary();

  const handleSelect = (id: string) => () => selectDiaryById(id);

  return (
    <ul className="">
      <Tooltip text="Completed" count={diaryList.length} className="mb-4" />
      <ScrollArea className="h-[calc(100vh-10.5rem)]">
        <div className="grid grid-cols-2 gap-8 items-start pr-8 pt-4  content-start auto-rows-fr">
          {diaryList.map((dairy) => {
            const isSelected = selectedDiary?.id === dairy.id;
            const progressPercent =
              (dairy.wellnessPointsEarned * 100) / dairy.wellnessPointsTarget;
            return (
              <>
                <article
                  className={cn(
                    "bg-white rounded-lg p-8 shadow-lg shadow-accent/10 relative cursor-pointer transition-all duration-100 hover:scale-[0.95]",
                    isSelected && "bg-accent"
                  )}
                  onClick={handleSelect(dairy.id)}
                >
                  <div
                    className="w-8 aspect-square rounded-full right-[-1rem] top-[-0.5rem] absolute"
                    style={{
                      backgroundColor: getMoodColor(dairy.mood as TMood),
                    }}
                  ></div>
                  <DateDisplay
                    date={dairy.dateCreated}
                    className="mb-6"
                    variant={isSelected ? "light" : "dark"}
                  />
                  <p
                    className={cn(
                      "text-wrap mb-8 text-lighter leading-6",
                      isSelected && "text-lightest"
                    )}
                  >
                    {truncateText(dairy.content, TEXT_TRUNCATE_LENGTH)}
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
                      <p>
                        {dairy.wellnessPointsTarget.toLocaleString("de-DE")}
                      </p>
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
