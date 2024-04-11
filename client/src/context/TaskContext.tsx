import useTaskMutation from "@/hooks/useTaskMutation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TTaskContextValues = {};

type TTask = {
  id: string;
  title: string;
  points: number;
  description: string;
};

const TaskContext = createContext<TTaskContextValues | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  // const [expiredTaskCount, setExpiredTaskCount] = useState(0);

  // const { expiredTaskCount: expiredTaskAmount } = useTaskMutation();
  // useEffect(() => {
  //   setExpiredTaskCount(expiredTaskAmount);
  // }, []);

  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTask must be used inside of it's Provider's scope");
  return context;
}
