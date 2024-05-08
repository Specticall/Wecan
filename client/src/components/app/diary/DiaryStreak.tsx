import { useUser } from "@/context/UserContext";

// Displays the user current streak
export default function DiaryStreak() {
  const { userData } = useUser();

  // Streak only exists if the user has a streak and the amount of data is NOT 0.
  const hasDiaryStreak =
    userData?.diaryStreak || (userData && userData?.diaryStreak > 0);
  return (
    <div className="bg-white mt-4 p-4 rounded-xl 2xl:p-4">
      <div
        className="p-10 rounded-lg relative grid overflow-hidden dotted-grid bg-white-soft place-items-center grid-cols-1"
        style={
          {
            // background:
            //   "linear-gradient(164deg, rgba(235,237,255,1) 0%, rgba(245,246,255,1) 100%)",
          }
        }
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {hasDiaryStreak
              ? `Great Job! You Have A ${
                  userData?.diaryStreak || 0
                } Diary Streak 🔥`
              : "You Have No Streak Right Now"}
          </h2>
          <p className="mt-6 text-lighter max-w-[20rem]  lg:max-w-[25rem] leading-md mx-auto">
            {hasDiaryStreak
              ? `You have been noting down things happening in your life for diaries
            for ${userData?.diaryStreak || 0} days in a row.`
              : " Do you know that maintaining a diary is an effective method to stay connected with time?"}
          </p>
        </div>
        <div></div>
        {/* <img
          src={personReachingOutArt}
          alt="person reaching out art"
          className="absolute top-0 right-[-10rem] h-[17.5rem] lg:hidden"
        /> */}
      </div>
    </div>
  );
}
