import Button from "@/components/general/Button";
import DateDisplay from "@/components/general/DateDisplay";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { usePopup } from "@/context/PopupContext";
import useDiaryMutation from "@/hooks/useDiaryMutation";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

// Diary form displayed in the darhboard
export default function DashboardDiary() {
  const { createMutation, diaryMadeToday } = useDiaryMutation();
  const [diaryValue, setDiaryValue] = useState(diaryMadeToday?.content || "");

  const { notify } = usePopup();
  const [isError, setIsError] = useState(false);
  // Save a reference to the previous timeout so we can clear it when a new one is being called.
  const previousTimeout = useRef<NodeJS.Timeout | undefined>();

  const handleCreateDiary = () => {
    // Make sures the diary value is not empty.
    if (!diaryValue) {
      notify("Diary Can't be Empty");
      setIsError(true);

      // Clears the previous timeout before setting up a new one to prevent race conditions.
      clearTimeout(previousTimeout.current);

      previousTimeout.current = setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }
    createMutation.mutate({ content: diaryValue });
  };

  return (
    <div className="mt-4 flex flex-col flex-1 bg-white p-8 rounded-xl 3xl:order-2 3xl:row-span-2 3xl:mt-0 lg:h-[25rem] md:p-6 sm:p-4">
      <div className="flex justify-between items-center mb-5 md:flex-col md:gap-3 md:items-start">
        <h2 className="text-lg  flex items-center justify-center gap-2 font-semibold">
          <i className="bx bx-book text-[2rem]"></i>Your Diary
        </h2>
        <DateDisplay
          variant={"dark"}
          date={new Date()}
          className="md:[&>i]:hidden"
        />
      </div>
      <textarea
        placeholder="Dear Diary..."
        className={cn(
          "resize-none w-full rounded-xl  p-8 flex-1 bg-white-soft",
          isError && "border-[1px] border-red-400"
        )}
        onChange={(e) => setDiaryValue(e.target.value)}
        defaultValue={diaryMadeToday?.content || diaryValue}
        disabled={Boolean(diaryMadeToday)}
      ></textarea>
      {isError && <p className="text-red-400 mt-2">Diary Can't be Empty</p>}
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
