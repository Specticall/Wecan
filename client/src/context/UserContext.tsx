import { TUserData } from "@/types/general";
import { ReactNode, createContext, useContext, useState } from "react";

type TUserContextValues = {
  setUserData: React.Dispatch<React.SetStateAction<TUserData | undefined>>;
  userData: TUserData | undefined;
};

const UserContext = createContext<TUserContextValues | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<TUserData>();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used inside of it's Provider's scope");
  return context;
}
