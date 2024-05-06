import useDiaryMutation from "@/hooks/useDiaryMutation";
import DateDisplay from "../general/DateDisplay";
import { useState } from "react";
import Button from "../general/Button";
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
      <div className="section flex-1 grid grid-cols-2 md:grid-cols-1  place-items-center py-12 gap-24 md:px-0 md:gap-12">
        <div className="justify-self-start w-full md:order-2">
          <DateDisplay variant={"dark"} date={new Date()} />
          <h2 className="text-lg mt-4">Write Your Diary</h2>
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
          <h1 className="text-lg font-semibold leading-[140%] mb-6 text-center md:hidden ">
            Keeping a diary is a good habbit.
          </h1>
          <p className="leading-[175%]  text-lighter text-center md:hidden ">
            Do you know that maintaining a diary is an effective method to stay
            connected with time, ourselves, and past events that may influence
            our life.
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-[10rem_1fr_10rem_10rem] md:grid-cols-1 gap-6 max-w-[1500px] mx-auto px-8 pb-4 mt-16 md:gap-4 md:p-0 md:mt-0">
        <Button variant="tertiary" onClick={prevPage} className="md:order-2">
          Previous
        </Button>
        <div></div>
        <Button
          variant="transparent"
          className="border-none text-accent md:order-1"
          onClick={handleSkip}
          disabled={updateMutation.isLoading && !isSavingDiary}
          isLoading={updateMutation.isLoading && !isSavingDiary}
        >
          Skip
        </Button>
        <Button
          className="shadow-none md:order-3"
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
