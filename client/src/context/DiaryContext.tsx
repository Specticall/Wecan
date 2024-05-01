import { ReactNode, createContext, useContext, useState } from "react";

import useDiaryMutation from "@/hooks/useDiaryMutation";

export type TDiary = {
  dateCreated: string;
  id: string;
  content: string;
};

type TDiaryContextValues = {
  diaryList: TDiary[] | undefined;
  selectedDiary: TDiary | undefined;
  selectDiaryById: (id: string) => void;
};


const DiaryContext = createContext<TDiaryContextValues | null>(null);

/*
This context servers as gateway for the diary page to display selected diary entry.
*/
export function DiaryProvider({ children }: { children: ReactNode }) {
  const { diaryQuery } = useDiaryMutation();
  const [selectedDiary, setSelectedDiary] = useState<TDiary | undefined>();

  const diaryList = diaryQuery.data;

  // Selects a diary entry by its id.
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
