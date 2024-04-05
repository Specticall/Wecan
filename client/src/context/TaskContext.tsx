import { ReactNode, createContext, useContext, useState } from "react";

type TTaskContextValues = {};

export type TTask = {
  id: string;
  title: string;
  points: number;
  description: string;
};

const TaskContext = createContext<TTaskContextValues | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  // const [acceptedTaskId, setAcceptedTaskId] = useState<string[]>([]);

  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTask must be used inside of it's Provider's scope");
  return context;
}
