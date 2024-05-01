import DiaryDetails from "@/components/app/diary/DiaryDetails";
import DiaryPreview from "@/components/app/diary/DiaryPreview";

// Entry Point for the `/app/diary` route
export default function Diary() {
  return (
    <main className="grid grid-cols-[6fr_4fr] items-start content-start px-4 pb-4 gap-4 2xl:grid-cols-1 sm:p-2">
      <h1 className="mt-6 text-lg text-dark font-semibold lg:block hidden sm:mt-2">
        Diary
      </h1>
      <DiaryPreview />
      <DiaryDetails />
    </main>
  );
}
