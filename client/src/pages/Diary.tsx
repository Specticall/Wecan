import DiaryDetails from "@/components/app/diary/DiaryDetails";
import DiaryPreview from "@/components/app/diary/DiaryPreview";

export default function Diary() {
  return (
    <main className="grid grid-cols-[6fr_4fr] items-start content-start px-4 pb-4 gap-4">
      <DiaryPreview />
      <DiaryDetails />
    </main>
  );
}
