import DateDisplay from "@/components/general/DateDisplay";

export default function DiaryView({
  content,
  dateCreated,
}: {
  content: string;
  dateCreated: Date;
}) {
  return (
    <div className="flex flex-col flex-1 bg-white p-6 rounded-xl lg:p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg  flex items-center justify-center gap-2 font-semibold">
          <i className="bx bx-book text-[2rem]"></i>Your Diary
        </h2>
        <DateDisplay variant={"dark"} date={dateCreated} />
      </div>
      <textarea
        placeholder="Dear Diary..."
        className="resize-none w-full rounded-xl  p-8 flex-1 bg-white-soft text-light leading-lg"
        value={content}
        disabled={true}
      ></textarea>
    </div>
  );
}
