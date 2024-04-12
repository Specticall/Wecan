import { TServerSucessResponse, TUserData } from "@/types/general";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type TAuthContextValues = {
  token: string | undefined;
  handleSuccessfulLogin: (userData: TUserData, token: string) => void;
  userId: string | undefined;
  hasReloadSavedLoginData: boolean;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export const reloadSavedLoginDataLoader = async () => {
  //1. Retrieve user id and token from local storage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  // 2. If either does not exist than user have to login again.
  if (!token || !userId) return null;

  // 3. Fetch the user data
  const response = await axios.get<TServerSucessResponse<TUserData>>(
    `${BASE_URL}${BASE_ENDPOINT}/v1/user?id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // 4. Send to react router's loader
  return response.data.data;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>();
  const [hasReloadSavedLoginData, setHasReloadSavedLoginData] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userData = useLoaderData() as TUserData | undefined;

  //Retrieve user id and token from local storage and store them in state.
  useEffect(() => {
    queryClient.resetQueries();

    if (!userData) {
      setHasReloadSavedLoginData(true);
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId)
      return console.log(
        "Something went wrong while trying to retrieve token or userId even tough loader has successful taken them"
      );

    setToken(token);
    setUserId(userId);
    queryClient.setQueryData(["userData"], userData);
    setHasReloadSavedLoginData(true);
  }, [userData, token, userId, queryClient]);

  const handleSuccessfulLogin = (userData: TUserData, token: string) => {
    //1. Store the token and user id in local storage and state
    setToken(token);
    setUserId(userData.id);

    localStorage.setItem("token", token);
    localStorage.setItem("id", userData.id);

    //4. Redirect the user to `/app/dashboard`
    navigate("/app/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{ token, handleSuccessfulLogin, userId, hasReloadSavedLoginData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside of it's Provider's scope");
  return context;
}
