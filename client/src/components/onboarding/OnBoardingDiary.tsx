import useDiaryMutation from "@/hooks/useDiaryMutation";
import DateDisplay from "../general/DateDisplay";
import { useState } from "react";
import Button from "../general/Button";
import LoadingSpinner from "../general/loadingSpinner";

export default function OnBoardingDiary() {
  const { createMutation, diaryMadeToday } = useDiaryMutation();
  const [diaryValue, setDiaryValue] = useState(diaryMadeToday?.content || "");

  const handleCreateDiary = () => {
    createMutation.mutate({ content: diaryValue });
  };

  return (
    <div className="section flex-1 grid grid-cols-2 place-items-center py-12 gap-24">
      <div className="justify-self-start w-full ">
        <DateDisplay variant={"dark"} date={new Date()} />
        <h2 className="text-lg mt-4 ">Write Your Diary</h2>
        <p className=" text-lighter mb-6 mt-1">
          You can create a diary once per day at any time
        </p>
        <textarea
          placeholder="Dear Diary..."
          className="resize-none w-full rounded-md shadow-xl shadow-accent/5 p-8 h-[20rem]"
          onChange={(e) => setDiaryValue(e.target.value)}
          defaultValue={diaryMadeToday?.content || diaryValue}
          disabled={Boolean(diaryMadeToday)}
        ></textarea>
        <div className="flex items-center justify-end">
          {!diaryMadeToday && (
            <Button
              variant="dark"
              className="mt-4 px-8 ml-auto flex items-center justify-center gap-2"
              onClick={handleCreateDiary}
              disabled={createMutation.isLoading}
            >
              Create
              {createMutation.isLoading && <LoadingSpinner />}
            </Button>
          )}
        </div>
      </div>
      <div>
        <p className="text-white bg-dark py-[0.125rem] px-4 rounded-full w-fit mb-8">
          Optional
        </p>
        <h1 className="text-xl max-w-[20rem] leading-[140%] mb-6">
          Keeping a diary is a good habbit.
        </h1>
        <p className="leading-[175%]  text-lighter ">
          Do you know that maintaining a diary is an effective method to stay
          connected with time, ourselves, and past events that may influence our
          life.
        </p>
      </div>
    </div>
  );
}
