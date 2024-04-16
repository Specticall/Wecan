import { DatePickerWithRange } from "@/components/general/DateRangePicker";
import { useDiary } from "@/context/DiaryContext";
import EmptyDiaryList from "./EmptyDiaryList";
import { ScrollArea } from "@/components/ui/scrollable";
import DiaryPreviewItem from "./DiaryPreviewItem";

export default function DiaryPreview() {
  const { diaryList } = useDiary();

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
                return <DiaryPreviewItem diary={diary} />;
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
