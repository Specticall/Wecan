import { useDiary } from "@/context/DiaryContext";
import DiaryForm from "./DiaryForm";
import DiaryView from "./DiaryView";
import DiaryStreak from "./DiaryStreak";

export default function DiaryDetails() {
  const { selectedDiary } = useDiary();

  return (
    <div className="grid grid-rows-[30rem_auto]">
      {selectedDiary ? (
        <DiaryView
          content={selectedDiary.content}
          dateCreated={new Date(selectedDiary.dateCreated)}
        />
      ) : (
        <DiaryForm />
      )}
      <DiaryStreak />
    </div>
  );
}
