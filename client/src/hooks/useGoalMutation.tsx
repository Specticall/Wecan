import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TGoal, TServerSucessResponse } from "@/types/general";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// These are the only fields that the API will accept when updating user goal
type TAllowedToUpdate = {
  earned?: number;
  target?: number;
  status?: "OnGoing" | "Completed";
};

/*
The fetch function are using higher order functions to return a query function with the required variables such as `id` and `token` closed into the scope (closures). This is also done to make the `useQuery` and `useMutation` hook look less cluttered as easier to read. 
*/

const fetchGoalData = (id?: string, token?: string) => async () => {
  const response = await axios.get<TServerSucessResponse<TGoal>>(
    `${BASE_URL}${BASE_ENDPOINT}/v1/goal?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

const updateGoalData =
  (id?: string, token?: string) => (data: TAllowedToUpdate) => {
    return axios.post(`${BASE_URL}${BASE_ENDPOINT}/v1/goal?id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export default function useGoalMutation() {
  const { token, userId } = useAuth();
  const queryClient = useQueryClient();

  // Stores the user's goal data
  const goalQuery = useQuery({
    queryKey: ["userGoal", token, userId],
    queryFn: fetchGoalData(userId, token),
    enabled: Boolean(userId && token),
  });

  const goalData = goalQuery.data;

  // the update mutation will use an optimistic update approach because if will get frequently updated (especially the onboarding slider)
  const updateMutation = useMutation(updateGoalData(userId, token), {
    onMutate: (newData: TAllowedToUpdate) => {
      // 1. Cancel any ongoing query to prevent race conditions
      queryClient.cancelQueries({ queryKey: ["userGoal"] });

      // 2. Save the previous data on a variable so we can retrieve it later if the request fails
      const previousValue = queryClient.getQueryData([
        "userGoal",
        token,
        userId,
      ]) as TGoal | undefined;

      // 3. Optimistically update the new value
      queryClient.setQueryData(
        ["userGoal", token, userId],
        // Handling undefined cases cases the code to look like this ugh
        (old: TGoal | undefined) => {
          return old
            ? {
                ...old,
                ...newData,
              }
            : undefined;
        }
      );

      return { previousValue };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["userGoal", token, userId], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userGoal"], { refetchType: "inactive" });
    },
  });

  return { updateMutation, goalData, goalQuery };
}
