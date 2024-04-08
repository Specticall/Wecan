import { useAuth } from "@/context/AuthContext";
import { TMood } from "@/context/MoodContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useMoodMutation() {
  const queryClient = useQueryClient();
  const { token, userId } = useAuth();
  const { notify } = usePopup();

  const updateMutation = useMutation(
    (newMood?: TMood) => {
      return axios.patch(
        `${BASE_URL}${BASE_ENDPOINT}/v1/user?id=${userId}`,
        {
          mood: newMood || "Unknown",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onMutate: (newMood?: TMood) => {
        //1. Cancel outgoing queries (data fetching) to prevent race conditions
        queryClient.cancelQueries({ queryKey: ["userMood"] });

        //2. Save the previous value from the mood query cache (used in case the mutation fails)
        const previousMood = queryClient.getQueryData(["userMood"]);

        //3. Set an optimisitic update to the mood query cache
        queryClient.setQueryData(["userMood"], newMood);

        //4. Return the context (storage) that contains the previous value in case of an error
        return { previousMood };
      },
      onSuccess: (data) => {},
      onError: (error: AxiosError, newMood, context) => {
        /*
        If an error occur, we can simply revert back to the previous value we stored in the context
        */
        queryClient.setQueryData(["userMood"], context?.previousMood);
        // Make sure to also display an error message indicating something went wrong
        notify(
          "Something went wrong while attempting to change your mood, please try again later."
        );
      },
      onSettled: () => {
        /*
        It is important to have the query refetch again after the optimistic mutation process finished to make sure our UI contains the most recent and up to date data.
        */
        queryClient.invalidateQueries({ queryKey: ["userMood"] });
      },
    }
  );

  return { updateMutation };
}