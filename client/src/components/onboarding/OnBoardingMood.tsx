import { useUser } from "@/context/UserContext";
import happyArtwork from "/assets/dashboard-default.png";
import MoodSelector from "../app/moodModal/MoodSelector";
import useMoodMutation from "@/hooks/useMoodMutation";
import { useMood } from "@/context/MoodContext";

export default function OnBoardingMood() {
  const { userData } = useUser();
  const { updateMutation } = useMoodMutation();
  const { currentMood } = useMood();

  if (!userData) return;

  return (
    <div className="section flex-1 grid grid-cols-2 place-items-center py-12 gap-12">
      <div className="justify-self-start w-full">
        <h1 className="text-xl">Hi There! {userData.name}</h1>
        <p className="text-lighter max-w-[25rem] leading-6 mt-4 mb-12">
          Looks like this is your first time logging in today. Tell us how are
          you feeling today
        </p>
        <MoodSelector variant="clean" />
        <p className="text-lighter mt-4">*You can change it again later</p>
      </div>
      <div>
        <img src={happyArtwork} alt="Person being happy" className="" />
      </div>
    </div>
  );
}
