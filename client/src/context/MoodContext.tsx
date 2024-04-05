import { ReactNode, createContext, useContext, useState } from "react";

export type TMood = "Ecstatic" | "Happy" | "Neutral" | "Sad" | "Depressed";

type TMoodContextValues = {
  currentMood: TMood | undefined;
  setCurrentMood: React.Dispatch<React.SetStateAction<TMood | undefined>>;
};

const MoodContext = createContext<TMoodContextValues | null>(null);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [currentMood, setCurrentMood] = useState<TMood | undefined>();

  return (
    <MoodContext.Provider value={{ currentMood, setCurrentMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context)
    throw new Error("useMood must be used inside of it's Provider's scope");
  return context;
}
