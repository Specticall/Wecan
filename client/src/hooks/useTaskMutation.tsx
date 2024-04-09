import { useAuth } from "@/context/AuthContext";
import { TMood } from "@/context/MoodContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import {
  TServerSucessResponse,
  TTaskRequest,
  TUserTask,
} from "@/types/general";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useTaskMutation() {
  const { userId, token } = useAuth();
  const queryClient = useQueryClient();
  const { notify } = usePopup();

  const taskQuery = useQuery({
    queryKey: ["userTask", userId, token],
    queryFn: async () => {
      const response = await axios.get<TServerSucessResponse<TUserTask[]>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    },
  });

  const userTask = taskQuery.data;
  const onGoingTask = taskQuery.data?.filter(
    (data) => data.status === "OnGoing"
  );
  const addMutation = useMutation(
    (newTask: TTaskRequest) => {
      return axios.post(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task?id=${userId}`,
        { ...newTask, status: "OnGoing" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onMutate: () => {},
      onSuccess: () => {
        notify("Successfuly added a new task");
        queryClient.invalidateQueries(["userTask", userId, token]);
      },
      onError: (error: AxiosError) => {
        console.error({ ...error, stack: "" });
        notify("Oops, something went wrong while trying to add a new task");
      },
    }
  );

  const deleteMutation = useMutation(
    (taskId: string) => {
      return axios.delete(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task?taskId=${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onMutate: () => {},
      onSuccess: () => {
        notify("Successfuly deleted new task");
        queryClient.invalidateQueries(["userTask", userId, token]);
      },
      onError: (error: AxiosError) => {
        console.error({ ...error, stack: "" });
        notify("Oops, something went wrong while trying to delete a new task");
      },
    }
  );

  return { taskQuery, userTask, addMutation, onGoingTask, deleteMutation };
}
