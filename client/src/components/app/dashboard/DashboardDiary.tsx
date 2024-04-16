import Button from "@/components/general/Button";
import DateDisplay from "@/components/general/DateDisplay";
import LoadingSpinner from "@/components/general/loadingSpinner";
import useDiaryMutation from "@/hooks/useDiaryMutation";
import { useState } from "react";

export default function DashboardDiary() {
  const { createMutation, diaryMadeToday } = useDiaryMutation();
  const [diaryValue, setDiaryValue] = useState(diaryMadeToday?.content || "");

  const handleCreateDiary = () => {
    createMutation.mutate({ content: diaryValue });
  };

  return (
    <div className="mt-4 flex flex-col flex-1 bg-white p-8 rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg  flex items-center justify-center gap-2 font-semibold">
          <i className="bx bx-book text-[2rem]"></i>Your Diary
        </h2>
        <DateDisplay variant={"dark"} date={new Date()} />
      </div>
      <textarea
        placeholder="Dear Diary..."
        className="resize-none w-full rounded-xl  p-8 flex-1 bg-white-soft"
        onChange={(e) => setDiaryValue(e.target.value)}
        defaultValue={diaryMadeToday?.content || diaryValue}
        disabled={Boolean(diaryMadeToday)}
      ></textarea>
      <div className="flex items-center justify-between mt-4">
        <p className=" text-lighter self-start">
          You can create a diary once per day at any time*
        </p>
        {!diaryMadeToday && (
          <Button
            variant="dark"
            className="px-8 ml-auto flex items-center justify-center gap-2"
            onClick={handleCreateDiary}
            disabled={createMutation.isLoading}
          >
            Create
            {createMutation.isLoading && <LoadingSpinner />}
          </Button>
        )}
      </div>
    </div>
  );
}
