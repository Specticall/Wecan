import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios from "axios";
import { ReactNode, createContext, useContext } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { TServerSucessResponse } from "@/types/general";

// The format of the `mood` field used by the API
export type TMood = "Ecstatic" | "Happy" | "Neutral" | "Sad" | "Depressed";

type TMoodContextValues = {
  currentMood: TMood | undefined;
  moodQuery: UseQueryResult;
  // setCurrentMood: React.Dispatch<React.SetStateAction<TMood | undefined>>;
};

const MoodContext = createContext<TMoodContextValues | null>(null);

/*
 * MoodProvider is a context provider that fetches the user mood data from the server
 * and provides it to the children components.
 *
 * Note: This provider is outdated and should be replaced to use the new react-query custom hook pattern. This incosistency is due the fact that the project was built over a period of time a the pattern guidlines was not established properly at the beginning.
 */
export function MoodProvider({ children }: { children: ReactNode }) {
  // const [currentMood, setCurrentMood] = useState<TMood | undefined>();

  const { userId, token } = useAuth();

  // const username = userData?.name;

  const moodQuery = useQuery({
    queryKey: ["userMood", token],
    queryFn: async () => {
      const response = await axios.get<
        TServerSucessResponse<{ mood: TMood | "Unknown" }>
      >(`${BASE_URL}${BASE_ENDPOINT}/v1/user?id=${userId}&fields=mood`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.mood;
    },
    enabled: userId ? true : false,
  });

  const currentMood = moodQuery.data === "Unknown" ? undefined : moodQuery.data;

  return (
    <MoodContext.Provider value={{ currentMood, moodQuery }}>
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
