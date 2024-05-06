import { useUser } from "@/context/UserContext";
import Button from "../general/Button";
import MoodSelectorSlide from "../general/MoodSelectorSlide";
import useMoodMutation from "@/hooks/useMoodMutation";
import { useState } from "react";
import { TMood, useMood } from "@/context/MoodContext";
import OnboardingNavigation from "./OnBoardingNavigation";
import useOnboardingPagination from "@/hooks/useOnboardingPagination";

export default function OnBoardingMood() {
  const { userData } = useUser();
  const { currentMood } = useMood();
  const { updateMutation } = useMoodMutation();

  const [mood, setMood] = useState<TMood | undefined>(currentMood);
  const { nextPage } = useOnboardingPagination();

  if (!userData) return;

  const handleNext = () => {
    updateMutation.mutate(mood, {
      onSuccess: () => {
        nextPage();
      },
    });
  };

  return (
    <>
      <OnboardingNavigation />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-[2.25rem] text-dark text-center mt-12">
          Hi There! <span className="font-semibold">{userData.name}</span>
        </h1>
        <p className="text-center text-lighter mx-auto mt-2 mb-12 leading-md">
          Looks like this is your first time here. Tell us how are you feeling
          today
        </p>
        <div className="border-border border-[1px] rounded-xl px-8 pb-6 sm:w-screen sm:overflow-x-auto md:border-none md:px-0">
          <MoodSelectorSlide
            className="mt-8"
            onSelect={setMood}
            defaultValue={currentMood}
          />
        </div>
        <p className="text-light mt-4 text-[0.75rem]">
          You can change your mood anytime*
        </p>
      </div>
      <div className="w-full grid grid-cols-[10rem_1fr_10rem] sm:grid-cols-[1fr] max-w-[1500px] mx-auto px-8 pb-4 mt-16 sm:px-0">
        {/* <Button variant="tertiary">Previous</Button> */}
        <div></div>
        <div></div>
        <Button
          className="shadow-none"
          onClick={handleNext}
          disabled={!mood || updateMutation.isLoading}
          isLoading={updateMutation.isLoading}
        >
          Next
        </Button>
      </div>
    </>
  );

  // return (
  //   <div className="section flex-1 grid grid-cols-2 place-items-center py-12 gap-12">
  //     <div className="justify-self-start w-full">
  //       <h1 className="text-xl text-dark font-semibold">
  //         Hi There! {userData.name}
  //       </h1>
  //       <p className="text-light max-w-[25rem] leading-lg mt-4 mb-12 ">
  //         Hiya! Looks like this is your first time here.First of, tell us how
  //         are you feeling today
  //       </p>
  //       <MoodSelectorSlide />
  //       <p className="text-lighter mt-4">*You can change it again later</p>
  //     </div>
  //     <div>
  //       <img src={happyArtwork} alt="Person being happy" className="" />
  //     </div>
  //   </div>
  // );
}
