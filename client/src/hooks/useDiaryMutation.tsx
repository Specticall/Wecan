import { useAuth } from "@/context/AuthContext";
import { TDiary } from "@/context/DiaryContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse } from "@/types/general";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { isToday } from "date-fns";

export default function useDiaryMutation() {
  const { token, userId } = useAuth();
  const { notify } = usePopup();
  const queryClient = useQueryClient();

  const diaryQuery = useQuery(
    ["diaryList", token],
    async () => {
      const response = await axios.get<TServerSucessResponse<TDiary[]>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/diary?id=${userId}`,
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

  const diaryList = diaryQuery.data;
  const diaryMadeToday = diaryList?.find((diary) => isToday(diary.dateCreated));

  const bearerTokenHeader = {
    Authorization: `Bearer ${token}`,
  };

  const createMutation = useMutation({
    mutationFn: (diary: { content: string }) => {
      return axios.post<TServerSucessResponse<TDiary>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/diary`,
        {
          ...diary,
          id: userId,
        },
        {
          headers: bearerTokenHeader,
        }
      );
    },
    onSuccess: () => {
      // appendNewDiary(data.data.data);
      notify("Successfuly saved your diary");
      // showDialog("diaryCreation");
      queryClient.invalidateQueries(["userData"]);
      queryClient.invalidateQueries(["diaryList"]);
    },
    onError: (error: AxiosError) => {
      console.error({ ...error, stack: "" });
      notify("Oops, something went wrong while trying to save your diary");
    },
  });

  return { createMutation, diaryQuery, diaryList, diaryMadeToday };
}
