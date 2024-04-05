import DiaryDetails from "@/components/app/diary/DiaryDetails";
import DiaryList from "@/components/app/diary/DiaryList";

export default function Diary() {
  return (
    <main className="grid grid-cols-[5fr_4fr] items-start content-start">
      <div className="col-span-2">
        <h1 className="text-lg font-semibold pt-12 pb-6 mb-4">Diary Log</h1>
      </div>
      <DiaryList />
      <DiaryDetails />
    </main>
  );
}
