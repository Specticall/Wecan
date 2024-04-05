import { useMood } from "@/context/MoodContext";
import CurrentMood from "../task/CurrentMood";
import dashboardDefaultImage from "/assets/dashboard-default.png";

export default function DashboardQuotes() {
  const { currentMood } = useMood();
  return (
    <div className="flex flex-col self-stretch">
      <CurrentMood>
        <p className="text-lightest">
          {currentMood ? "Today, you have a" : "Click the button on the right"}
        </p>
        <h2 className="text-md text-white">
          {currentMood ? `${currentMood} Mood` : "Set Your Mood"}
        </h2>
      </CurrentMood>
      <div className="bg-white p-12 flex-1 flex gap-12 items-center justify-center flex-col">
        <img
          src={dashboardDefaultImage}
          alt="dashboard default image"
          className="w-[80%] object-cover"
        />
        <p className="max-w-[15rem] text-center text-light">
          “Success is getting what you want, Happiness is wanting what you get”
        </p>
      </div>
    </div>
  );
}
