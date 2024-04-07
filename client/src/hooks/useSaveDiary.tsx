import { useAuth } from "@/context/AuthContext";
import { TDiary, useDiary } from "@/context/DiaryContext";
import { TMoodServerEnum } from "@/context/MoodContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse } from "@/types/general";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export default function useDiaryMutation() {
  const { token, userId } = useAuth();
  const { notify } = usePopup();
  const { appendNewDiary } = useDiary();

  const bearerTokenHeader = {
    Authorization: `Bearer ${token}`,
  };

  const createMutation = useMutation({
    mutationFn: (diary: { content: string; mood: TMoodServerEnum }) =>
      axios.post<TServerSucessResponse<TDiary>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/diary`,
        {
          ...diary,
          id: userId,
        },
        {
          headers: bearerTokenHeader,
        }
      ),
    onMutate: () => {
      notify("Saving your diary...");
    },
    onSuccess: (data) => {
      appendNewDiary(data.data.data);
      notify("Successfuly saved your diary");
    },
    onError: (error: AxiosError) => {
      console.error({ ...error, stack: "" });
      notify("Oops, something went wrong while trying to save your diary");
    },
  });

  return { createMutation };
}
