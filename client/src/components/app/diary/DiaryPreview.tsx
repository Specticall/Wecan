import { useDiary } from "@/context/DiaryContext";
import EmptyDiaryList from "./EmptyDiaryList";
import { ScrollArea } from "@/components/ui/scrollable";
import DiaryPreviewItem from "./DiaryPreviewItem";

export default function DiaryPreview() {
  const { diaryList } = useDiary();

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-4 h-0 min-h-[100%] 2xl:h-fit 2xl:min-h-full lg:p-4">
      {/* <div>
        <p className="mb-3">Date Range Filter</p>
        <DatePickerWithRange />
      </div> */}
      <div className="bg-[#F7F7FA] flex-1 flex flex-col items-center justify-center rounded-lg">
        {diaryList?.length === 0 ? (
          <EmptyDiaryList />
        ) : (
          <ScrollArea className="w-full h-0 min-h-[100%] 2xl:h-full lg:max-h-[30rem]">
            <div className="p-8 grid grid-cols-2 gap-6 lg:grid-cols-1 xl:p-4">
              {diaryList?.map((diary) => {
                return (
                  <DiaryPreviewItem
                    diary={diary}
                    key={`${diary.dateCreated}`}
                  />
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
