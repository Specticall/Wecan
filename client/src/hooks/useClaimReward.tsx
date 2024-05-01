import { useAuth } from "@/context/AuthContext";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
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

// Handles the logic for claiming the goal reward. After a user finishes a goal, a claim reward button will apppear in a bunch of places throughout the app. This hook is used to share the logic for claiming the reward. When the user completes a goal, the reward will get generated and get "stashed" in the goal table/document. By using the methods from this week we tell the server that the reward has been claimed by the user.
export default function useClaimReward() {
  const queryClient = useQueryClient();
  const { token, userId } = useAuth();
  const { notify } = usePopup();
  const { showDialog, closeDialog } = useGlobalDialog();

  // This function is used to perform the reward animation when the user claims the reward straight from the goal complete modal.
  const performRewardAnimation = async () => {
    // Close the dialog and persist the background. This is done to prevent the background from getting removed and causing a flash when the dialog switches from the goal complete to the actual reward itself.
    await closeDialog({
      persistBackground: true,
    });

    // Display the reward to the user.
    showDialog("goalPrize");
  };

  const claimMutation = useMutation(claimReward(token, userId), {
    onSuccess: () => {
      performRewardAnimation();

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
