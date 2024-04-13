import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse, TUserTask } from "@/types/general";
import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useTaskMutation from "./useTaskMutation";

const DEFAULT_PAGINATION_SIZE = 5;

type TServerSuccessTaskResponse = TServerSucessResponse<TUserTask[]> & {
  totalTaskCount: number;
};

export default function usePaginatedTaskMutation({
  paginationSize = DEFAULT_PAGINATION_SIZE,
}: {
  paginationSize: number;
}) {
  const { userId, token } = useAuth();
  const [page, setPage] = useState(1);

  const paginatedTaskQuery = useQuery({
    queryKey: ["paginatedTask", userId, token, page, paginationSize],
    queryFn: async () => {
      const response = await axios.get<TServerSuccessTaskResponse>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task?id=${userId}&page=${page}&size=${paginationSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    enabled: userId && token ? true : false,
  });

  const paginatedTask = paginatedTaskQuery.data?.data;
  const taskCount = paginatedTaskQuery.data?.totalTaskCount;

  const prevPage = () => {
    setPage((cur) => Math.max(cur - 1, 1));
  };

  const nextPage = () => {
    if (!taskCount) return;
    setPage((cur) => Math.min(cur + 1, Math.ceil(taskCount / paginationSize)));
  };

  return {
    paginatedTaskQuery,
    nextPage,
    prevPage,
    paginatedTask,
    taskCount,
    page,
  };
}
