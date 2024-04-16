import DateDisplay from "@/components/general/DateDisplay";
import { DatePickerWithRange } from "@/components/general/DateRangePicker";
import { useDiary } from "@/context/DiaryContext";
import EmptyDiaryList from "./EmptyDiaryList";
import { ScrollArea } from "@/components/ui/scrollable";
import { cn } from "@/lib/utils";

export default function DiaryPreview() {
  const { diaryList, selectDiaryById } = useDiary();
  const handleSelect = (id: string) => () => {
    selectDiaryById(id);
  };

  return (
    <div className="bg-white rounded-xl p-8 flex flex-col gap-4  h-0 min-h-[100%]">
      <div>
        <p className="mb-3">Date Range Filter</p>
        <DatePickerWithRange />
      </div>
      <div className="bg-white-soft flex-1 flex flex-col items-center justify-center">
        {diaryList?.length === 0 ? (
          <EmptyDiaryList />
        ) : (
          <ScrollArea className="w-full h-0 min-h-[100%]">
            <div className="p-8 grid grid-cols-2 gap-6">
              {diaryList?.map((diary) => {
                return (
                  <article
                    key={diary.id}
                    className={cn(
                      "bg-white rounded-lg py-4 px-6 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-y-4 gap-x-4 h-[12.5rem] place-items-start cursor-pointer hover:scale-[97.5%] transition-all duration-200"
                    )}
                    onClick={handleSelect(diary.id)}
                  >
                    <div className="row-span-2 h-2 w-2 bg-accent rounded-full mt-4"></div>
                    <h3 className="flex items-center justify-between w-full">
                      <DateDisplay
                        className="text-[1rem]"
                        date={new Date(diary.dateCreated)}
                        hideIcon
                      />
                      <i className="bx bx-calendar text-[1.5rem] bg-white-soft p-2 rounded-md"></i>
                    </h3>
                    <p className="line-clamp-3 text-lighter leading-[200%] justify-self-start max-w-[20rem]">
                      {diary.content}
                    </p>
                  </article>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
