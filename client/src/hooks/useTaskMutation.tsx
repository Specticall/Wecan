import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import {
  TGoal,
  TServerSucessResponse,
  TTaskRequest,
  TUserTask,
} from "@/types/general";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

export default function useTaskMutation() {
  const { userId, token } = useAuth();
  const { userData } = useUser();
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
    enabled: userId && token && userData ? true : false,
  });

  // Typescript was not able to infer taskQuery.data as TUserTask[] because we seperated the check into a different variable `taskHasExpired` which why is have to manually assert to type.
  const userTask = taskQuery.data;

  const onGoingTask = userTask?.filter((data) => data.status === "OnGoing");

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
        queryClient.invalidateQueries({
          queryKey: ["userTask"],
        });
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
        queryClient.invalidateQueries(["paginatedTask"]);
      },
      onError: (error: AxiosError) => {
        console.error({ ...error, stack: "" });
        notify("Oops, something went wrong while trying to delete a new task");
      },
    }
  );

  const completeTaskMutation = useMutation(
    (taskId: string) => {
      return axios.post<TServerSucessResponse<TGoal>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task/completed?taskId=${taskId}&userId=${userId}`,
        {},
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
        notify("Success");
        queryClient.invalidateQueries(["userTask", userId, token]);
        queryClient.invalidateQueries(["userData", userId, token]);
      },
      onError: (error: AxiosError) => {
        console.error({ ...error, stack: "" });
        notify("Oops, something went wrong while trying to complete the task");
      },
    }
  );

  return {
    taskQuery,
    userTask,
    addMutation,
    onGoingTask,
    deleteMutation,
    completeTaskMutation,
  };
}
