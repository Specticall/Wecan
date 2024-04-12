import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TUserData } from "@/types/general";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUserMutation() {
  const { userId, token } = useAuth();
  const { notify } = usePopup();
  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (data: Partial<TUserData>) => {
      return axios.patch(
        `${BASE_URL}${BASE_ENDPOINT}/v1/user?id=${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        notify("Successfuly updated user data");
        queryClient.invalidateQueries(["userData", userId, token]);
      },
      onError: (error: AxiosError) => {
        console.error({ ...error, stack: "" });
        notify(
          "Oops, something went wrong while trying to update the user data"
        );
      },
    }
  );

  return { updateMutation };
}
