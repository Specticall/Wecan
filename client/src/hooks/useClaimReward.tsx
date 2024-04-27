import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const claimReward = (token?: string, userId?: string) => async () => {
  return axios.post(
    `${BASE_URL}${BASE_ENDPOINT}/v1/goal/claim?id=${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default function useClaimReward() {
  const queryClient = useQueryClient();
  const { token, userId } = useAuth();
  const { notify } = usePopup();

  const claimMutation = useMutation(claimReward(token, userId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["userGoal"]);
      queryClient.invalidateQueries(["userData"]);
      queryClient.invalidateQueries(["userBackground"]);
    },
    onError: () => {
      notify(
        "Something went wrong while trying to claim your reward, please try again later"
      );
    },
  });

  return { claimMutation };
}