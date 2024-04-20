import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { TServerSucessResponse, TUserTask } from "@/types/general";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PAGINATION_SIZE = 7;

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
  const [filter, setFilter] = useState<"All" | "OnGoing" | "Completed">("All");
  const [date, setDate] = useState<Date | undefined>();

  const paginatedTaskQuery = useQuery({
    queryKey: [
      "paginatedTask",
      userId,
      token,
      page,
      paginationSize,
      filter,
      date,
    ],
    queryFn: async () => {
      const response = await axios.get<TServerSuccessTaskResponse>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/task?id=${userId}&page=${page}&size=${paginationSize}&status=${
          filter === "All" ? "" : filter
        }&date=${date ? date.getTime() : ""}`,
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

  const onFirstPage = page === 1;
  const onLastPage =
    taskCount && page === Math.ceil(taskCount / paginationSize);

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
    filter,
    setFilter,
    setDate,
    onFirstPage,
    onLastPage,
  };
}
