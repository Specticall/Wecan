import { useUser } from "@/context/UserContext";
import personReachingOutArt from "/assets/person-reaching-out.png";

export default function DiaryStreak() {
  const { userData } = useUser();

  return (
    <div className="bg-white mt-4 p-6 rounded-xl">
      <div
        className="p-10 rounded-lg relative grid grid-cols-[1fr_10rem] overflow-hidden"
        style={{
          background:
            "linear-gradient(164deg, rgba(235,237,255,1) 0%, rgba(245,246,255,1) 100%)",
        }}
      >
        <div>
          <h2 className="text-lg max-w-[16rem] font-semibold">
            Great Job! You Have A {userData?.diaryStreak || 0} Diary Streak 🔥
          </h2>
          <p className="mt-6 text-lighter max-w-[17.5rem] leading-6">
            You have been noting down things happening in your life for diaries
            for 12 days in a row.
          </p>
        </div>
        <div></div>
        <img
          src={personReachingOutArt}
          alt="person reaching out art"
          className="absolute top-0 right-[-10rem] h-[17.5rem]"
        />
      </div>
    </div>
  );
}
