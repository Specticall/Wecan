import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { THistory, TServerSucessResponse } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Factory function that returns a query function that fetches the user history data from the server with id and token which as been coupled through closures.
const getHistory = (id?: string, token?: string) => async () => {
  const response = await axios.get<TServerSucessResponse<THistory>>(
    `${BASE_URL}${BASE_ENDPOINT}/v1/history?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

// Handles the logic for fetching the user history data.
export default function useHistoryMutation() {
  const { token, userId } = useAuth();

  const historyQuery = useQuery({
    queryFn: getHistory(userId, token),
    queryKey: ["userHistory", userId, token],
  });

  const historyData = historyQuery.data;

  return { historyData, historyQuery };
}
