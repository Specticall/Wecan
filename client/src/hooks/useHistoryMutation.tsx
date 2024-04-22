import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { THistory, TServerSucessResponse } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export default function useHistoryMutation() {
  const { token, userId } = useAuth();

  const historyQuery = useQuery({
    queryFn: getHistory(userId, token),
    queryKey: ["userHistory", userId, token],
  });

  const historyData = historyQuery.data;

  return { historyData, historyQuery };
}
