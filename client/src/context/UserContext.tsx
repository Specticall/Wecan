import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse, TUserData } from "@/types/general";
import { ReactNode, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

type TUserContextValues = {
  userData: TUserData | undefined;
  userQuery: UseQueryResult<TUserData>;
};

const UserContext = createContext<TUserContextValues | null>(null);

/*
 * UserProvider is a context provider that fetches the user data from the server
 * and provides it to the children components.
 *
 * Note: This provider is outdated and should be replaced to use the new react-query custom hook pattern. This incosistency is due the fact that the project was built over a period of time a the pattern guidlines was not established properly at the beginning.
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const { userId, token } = useAuth();

  const userQuery = useQuery(
    ["userData", userId, token],
    async () => {
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
      enabled: userId ? true : false,
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
