import { ReactNode, createContext, useContext } from "react";

type TUserContextValues = {};

const UserContext = createContext<TUserContextValues | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used inside of it's Provider's scope");
  return context;
}
