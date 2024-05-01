import useDiaryMutation from "@/hooks/useDiaryMutation";
import DateDisplay from "../general/DateDisplay";
import { useState } from "react";
import Button from "../general/Button";
import LoadingSpinner from "../general/loadingSpinner";
import personReadingArt from "/assets/person-reading-book.png";
import OnboardingNavigation from "./OnBoardingNavigation";
import useOnboardingPagination from "@/hooks/useOnboardingPagination";
import { useNavigate } from "react-router-dom";
import useUserMutation from "@/hooks/useUserMutation";
import { usePopup } from "@/context/PopupContext";

export default function OnBoardingDiary() {
  const { createMutation, diaryMadeToday } = useDiaryMutation();
  const { updateMutation } = useUserMutation();
  const [diaryValue, setDiaryValue] = useState(diaryMadeToday?.content || "");
  const { prevPage } = useOnboardingPagination();
  const { notify } = usePopup();
  const navigate = useNavigate();

  const [isSavingDiary, setIsSavingDiary] = useState(false);

  const handleNext = async () => {
    try {
      setIsSavingDiary(true);
      await Promise.all([
        createMutation.mutateAsync({ content: diaryValue }),
        updateMutation.mutateAsync({ hasOnboarded: true }),
      ]);

      navigate("/app/dashboard");
    } catch (err) {
      notify("Oops, Something went wrong!");
    } finally {
      setIsSavingDiary(false);
    }
  };

  const handleSkip = () => {
    updateMutation.mutateAsync(
      { hasOnboarded: true },
      {
        onSuccess: () => {
          navigate("/app/dashboard");
        },
      }
    );
  };

  return (
    <>
      <OnboardingNavigation />
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
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={personReadingArt} alt="person reading" />
          <h1 className="text-lg font-semibold leading-[140%] mb-6 text-center">
            Keeping a diary is a good habbit.
          </h1>
          <p className="leading-[175%]  text-lighter text-center ">
            Do you know that maintaining a diary is an effective method to stay
            connected with time, ourselves, and past events that may influence
            our life.
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-[10rem_1fr_10rem_10rem] gap-6 max-w-[1500px] mx-auto px-8 pb-4 mt-16">
        <Button variant="tertiary" onClick={prevPage}>
          Previous
        </Button>
        <div></div>
        <Button
          variant="transparent"
          className="border-none text-accent"
          onClick={handleSkip}
          disabled={updateMutation.isLoading && !isSavingDiary}
          isLoading={updateMutation.isLoading && !isSavingDiary}
        >
          Skip
        </Button>
        <Button
          className="shadow-none"
          onClick={handleNext}
          disabled={!diaryValue || isSavingDiary}
          isLoading={isSavingDiary}
        >
          Next
        </Button>
      </div>
    </>
  );
}
