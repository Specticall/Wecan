import { ReactNode, createContext, useContext, useState } from "react";
import { TMood } from "./MoodContext";
import { useQuery } from "react-query";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios from "axios";
import { TServerSucessResponse } from "@/types/general";
import { useAuth } from "./AuthContext";

// const diaryListTemp = [
//   {
//     dateCreated: new Date(Date.now() + 9328234234).toDateString(),
//     id: "DAIRY1",
//     content:
//       "Today's exams didn't go as planned despite all the studying I put in. It's a bummer to feel like I've fallen short despite my efforts. But I know this setback is just a part of the journey. Tomorrow's a fresh start, and I'm determined to bounce back stronger.",
//     earnedPoints: 1000,
//     targetPoints: 15000,
//     mood: "Sad",
//   },
//   {
//     dateCreated: new Date(Date.now() + 3434234234).toDateString(),
//     id: "DAIRY2",
//     content:
//       "Had a great day at the park with friends. It was refreshing to take a break from studying and just enjoy the outdoors.",
//     earnedPoints: 7000,
//     targetPoints: 15000,
//     mood: "Happy",
//   },
//   {
//     dateCreated: new Date(Date.now() + 10000234234).toDateString(),
//     id: "DAIRY3",
//     content:
//       "Struggled to stay focused during my study sessions today. I'm feeling a bit overwhelmed with all the material I need to cover.",
//     earnedPoints: 5000,
//     targetPoints: 15000,
//     mood: "Ecstatic",
//   },
//   {
//     dateCreated: new Date(Date.now() + 35934234234).toDateString(),
//     id: "DAIRY4",
//     content:
//       "Today was productive. Managed to complete a lot of tasks on my to-do list. Feeling accomplished and ready to tackle tomorrow.",
//     earnedPoints: 8000,
//     targetPoints: 15000,
//     mood: "Happy",
//   },
//   {
//     dateCreated: new Date(Date.now() + 343557234).toDateString(),
//     id: "DAIRY5",
//     content:
//       "Spent the day relaxing and recharging. Watched a movie and cooked a nice meal. It's important to take care of myself amidst the busyness.",
//     earnedPoints: 6000,
//     targetPoints: 15000,
//     mood: "Neutral",
//   },
//   {
//     dateCreated: new Date(Date.now() + 3593457234).toDateString(),
//     id: "DAIRY6",
//     content:
//       "Had a challenging day at school. I didn't do as well as I hoped on a test. It's disappointing, but I'm trying to learn from this experience.",
//     earnedPoints: 4000,
//     targetPoints: 15000,
//     mood: "Depressed",
//   },
//   {
//     dateCreated: new Date(Date.now() + 3445345234).toDateString(),
//     id: "DAIRY7",
//     content:
//       "Today was a good day. I spent time with family and managed to get some studying done. I'm feeling balanced and content.",
//     earnedPoints: 7000,
//     targetPoints: 15000,
//     mood: "Happy",
//   },
//   {
//     dateCreated: new Date(Date.now() + 1111234234).toDateString(),
//     id: "DAIRY8",
//     content:
//       "I'm feeling stressed about upcoming exams. I'm trying to stay positive and keep a healthy perspective. I know I can handle this.",
//     earnedPoints: 5000,
//     targetPoints: 15000,
//     mood: "Sad",
//   },
// ];

export type TDiary = {
  dateCreated: string;
  id: string;
  content: string;
  earnedPoints: number;
  targetPoints: number;
  mood: TMood;
};

type TDiaryContextValues = {
  diaryList: TDiary[] | undefined;
  selectedDiary: TDiary | undefined;
  selectDiaryById: (id: string) => void;
};

// TODO
/*
GET DIARY FROM BACKEND AND SWITCH STATE TO QUERY.
*/

const DiaryContext = createContext<TDiaryContextValues | null>(null);

export function DiaryProvider({ children }: { children: ReactNode }) {
  // const [diaryList, setDiaryList] = useState<TDiary[]>(
  //   () => diaryListTemp as TDiary[]
  // );
  const { userId, token } = useAuth();
  const [selectedDiary, setSelectedDiary] = useState<TDiary | undefined>();

  const diaryQuery = useQuery(
    ["diaryList"],
    async () => {
      const response = await axios.get<TServerSucessResponse<TDiary[]>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/diary?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    },
    {
      enabled: userId && token ? true : false,
    }
  );

  const diaryList = diaryQuery.data;

  const selectDiaryById = (id: string) => {
    if (!diaryList) return;
    const selected = diaryList.find((diary) => diary.id === id);
    if (!selected)
      throw new Error(
        `Diary with the id of ${id} is not found. Take a look at the diary context`
      );
    setSelectedDiary((current) =>
      selected.id === current?.id ? undefined : selected
    );
  };

  // const appendNewDiary = (newDiary: TDiary) => {
  //   setDiaryList((current) => [...current, newDiary]);
  // };

  return (
    <DiaryContext.Provider
      value={{ diaryList, selectDiaryById, selectedDiary }}
    >
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context)
    throw new Error("useDiary must be used inside of it's Provider's scope");
  return context;
}
