import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse, TUserData } from "@/types/general";
import { ReactNode, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

type TUserContextValues = {
  userData: TUserData | undefined;
  userQuery: UseQueryResult<TUserData>;
};

const UserContext = createContext<TUserContextValues | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { userId, token } = useAuth();

  const userQuery = useQuery(
    ["userData", userId, token],
    async () => {
      console.log("RUNNN", userId && token ? true : false);
      const response = await axios.get<TServerSucessResponse<TUserData>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/user?id=${userId}`,
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

  const userData = userQuery.data;

  return (
    <UserContext.Provider value={{ userData, userQuery }}>
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
