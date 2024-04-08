import { DialogCollapse } from "@/context/GlobalDialogContext";
import { useUser } from "@/context/UserContext";
import modalArtSad from "/assets/modal-art-sad.png";
import modalArtEncouragement from "/assets/modal-art-encouragement.png";
import modalArtWelcome from "/assets/modal-art-welcome.png";
import { useState } from "react";
import Button from "@/components/general/Button";
import { useMood } from "@/context/MoodContext";
import { getMoodColor } from "@/lib/utils";

const pages = [<IntroPage />, <EncouragementPage />, <PointPage />];

export default function DiaryCreationDialog() {
  const [page, setPage] = useState(0);
  const { userData } = useUser();

  if (!userData) return;

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-white px-10 py-10 max-w-[55rem] rounded-md grid grid-cols-2 gap-8 grid-rows-[1fr_auto]">
      {pages[page]}
      <div className="flex justify-end mt-4 gap-4 h-fit">
        {page > 0 && (
          <Button
            variant="transparent"
            className="items-center flex justify-center py-2 gap-1 pl-4"
            onClick={handlePrevPage}
          >
            <i className="bx bx-chevron-right text-md rotate-180"></i>Back
          </Button>
        )}
        {page < pages.length - 1 ? (
          <Button
            variant="transparent"
            className="items-center flex justify-center py-2 gap-1 pr-4"
            onClick={handleNextPage}
          >
            Next <i className="bx bx-chevron-right text-md "></i>
          </Button>
        ) : (
          <DialogCollapse className="bg-accent rounded-full px-8 py-2 w-fit text-lightest cursor-pointer">
            Let's Go
          </DialogCollapse>
        )}
      </div>
    </div>
  );
}

function IntroPage() {
  const { currentMood } = useMood();

  return (
    <>
      <img src={modalArtSad} className="w-[24rem] row-span-2" />
      <div className="h-full">
        <p className="text-light mb-2 text-start mt-8">
          Your diary has been saved
        </p>
        <h2 className="text-lg text-darkest text-start mb-5">
          Look's like your feeling a little under the weather today
        </h2>
        <p className="flex gap-2 items-center">
          Your Mood
          <span
            className="bg-darkest text-white px-4 py-1 rounded-full"
            style={{
              background: currentMood
                ? getMoodColor(currentMood)
                : "rgb(74 90 239)",
            }}
          >
            {currentMood}
          </span>
        </p>
      </div>
    </>
  );
}

function EncouragementPage() {
  return (
    <>
      <img src={modalArtEncouragement} className="w-[24rem] row-span-2" />
      <div className="flex flex-col items-start">
        <h3 className="text-md mb-4 mt-8">You've got this!</h3>
        <p className="text-lighter text-md leading-8">
          Life can be tough, but so are you. We're here for you, cheering you on
          every step of the way.
        </p>
      </div>
    </>
  );
}

function PointPage() {
  const { userData } = useUser();

  if (!userData) return;

  return (
    <>
      <img src={modalArtWelcome} className="w-[24rem] row-span-2" />
      <div className="flex flex-col items-start justify-center">
        <p className="mb-1">Today's Goal</p>
        <h3 className="text-xl mb-4">
          {userData.point.targetToday.toLocaleString("de-DE")} points
        </h3>
        <p className="text-lighter leading-[200%]">
          Do you know that doing certain activies will boost your overall mood
          and make your day better? So what are you waiting for? let's start
          right now!
        </p>
      </div>
    </>
  );
}
