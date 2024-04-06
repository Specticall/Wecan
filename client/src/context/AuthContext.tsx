import { TUserData } from "@/types/general";
import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

type TAuthContextValues = {
  token: string | undefined;
  handleSuccessfulLogin: (userData: TUserData, token: string) => void;
};

const AuthContext = createContext<TAuthContextValues | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);

  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleSuccessfulLogin = (userData: TUserData, token: string) => {
    //1. Store the token in local storage and state
    setToken(token);
    localStorage.setItem("token", token);

    //2. Send user data to the `UserContext`
    setUserData(userData);

    //3. Update user last login date
    type TODO = any;

    //4. Redirect the user to `/app/dashboard`
    navigate("/app/dashboard");
  };

  return (
    <AuthContext.Provider value={{ token, handleSuccessfulLogin }}>
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
