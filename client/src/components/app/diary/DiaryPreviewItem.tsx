import DateDisplay from "@/components/general/DateDisplay";
import { TDiary, useDiary } from "@/context/DiaryContext";
import { cn } from "@/lib/utils";

const SELECTED_GRADIENT = "linear-gradient(180deg, #E7E7F8 0%, #E8EAFF 100%)";

export default function DiaryPreviewItem({ diary }: { diary: TDiary }) {
  const { selectDiaryById, selectedDiary } = useDiary();

  const handleSelect = (id: string) => () => {
    selectDiaryById(id);
  };

  const isSelected = selectedDiary?.id === diary.id;

  return (
    <article
      key={diary.id}
      className={cn(
        "bg-white rounded-lg py-4 px-6 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-y-4 gap-x-4 h-[12.5rem] place-items-start cursor-pointer hover:scale-[97.5%] transition-all duration-200",
        isSelected && "border-white/50 border-[1px]"
      )}
      style={isSelected ? { background: SELECTED_GRADIENT } : undefined}
      onClick={handleSelect(diary.id)}
    >
      <div className="row-span-2 h-2 w-2 bg-accent rounded-full mt-4"></div>
      <h3 className="flex items-center justify-between w-full">
        <DateDisplay
          className="text-[1rem]"
          date={new Date(diary.dateCreated)}
          hideIcon
        />
        <i
          className={cn(
            "bx bx-calendar text-[1.5rem] bg-white-soft p-2 rounded-md",
            isSelected && "bg-white"
          )}
        ></i>
      </h3>
      <p className="line-clamp-3 text-light leading-[200%] justify-self-start max-w-[20rem]">
        {diary.content}
      </p>
    </article>
  );
}
