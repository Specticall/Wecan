import { useAuth } from "@/context/AuthContext";
import { useMood } from "@/context/MoodContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TGeneratedTask, TServerSucessResponse } from "@/types/general";
import axios from "axios";
import { useQuery } from "react-query";

export default function useTaskGenerator() {
  const { currentMood } = useMood();
  const { token, userId } = useAuth();

  const moodQueryString = `&mood=${currentMood}`;

  const generatedTaskQuery = useQuery({
    queryKey: ["generatedTask"],
    queryFn: async () => {
      const response = await axios.get<TServerSucessResponse<TGeneratedTask>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task/generated?id=${userId}${
          currentMood ? moodQueryString : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    },
  });

  const generatedTask = generatedTaskQuery.data;

  return { generatedTask, generatedTaskQuery };
}
