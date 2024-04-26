import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { useUser } from "@/context/UserContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import {
  TBackground,
  TServerSucessResponse,
  TUserBackground,
} from "@/types/general";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useBackground() {
  const { token, userId } = useAuth();
  const { userData } = useUser();
  const { notify } = usePopup();
  const queryClient = useQueryClient();

  const backgroundQuery = useQuery({
    queryKey: ["allBackgrounds"],
    queryFn: async () => {
      const response = await axios.get<TServerSucessResponse<TBackground[]>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/background`
      );
      return response.data.data;
    },
  });

  const userBackgroundQuery = useQuery({
    queryKey: ["userBackground", userId, token],
    queryFn: async () => {
      const response = await axios.get<
        TServerSucessResponse<TUserBackground[]>
      >(`${BASE_URL}${BASE_ENDPOINT}/v1/background/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    },
  });

  // Selects the background
  const selectMutation = useMutation(
    (backgroundId: string) => {
      return axios.patch(
        `${BASE_URL}${BASE_ENDPOINT}/v1/background/user?id=${userId}`,
        {
          backgroundId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      // Pass the context so we can load only the background that is being set
      onMutate: (backgroundId: string) => {
        return { backgroundId };
      },
      onSuccess: () => {
        notify("Successfuly Updated Your Background");
        queryClient.invalidateQueries(["userData"]);
      },
      onError: () => {
        notify("Something went wrong while trying to update your background");
      },
    }
  );

  const userBackgroundData = userBackgroundQuery.data;

  /*
  This will "merge" the background data and userbackground data. Essentially if background is owned by the user that the background data will have its `owned` property (made from this function) set to true. 

  NOTE: There are probably more efficient implementations (this one creates alot of memory because we're spreaind on each iterations) out there but for now, this works.
  */
  const backgroundData = backgroundQuery.data?.map((background) => {
    // Checks if the current iterated background is owned by the user
    const owned = Boolean(
      userBackgroundData?.find((data) => data.backgroundId === background.id)
        ?.backgroundId
    );

    // Checks if the current iterated background is selected / used by the user.
    const selected = userData?.selectedBackgroundURL === background.URL;

    return { ...background, owned, selected };
  });

  return {
    backgroundData,
    backgroundQuery,
    userBackgroundData,
    userBackgroundQuery,
    selectMutation,
  };
}
