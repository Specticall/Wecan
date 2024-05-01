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

/**
 * Handles the logic for paginating the task data. Used for pagination the task data in the `<TaskList />` component. (Table version)
 * @param paginationSize - The number of task to show per page
 * @returns
 */
export default function usePaginatedTaskMutation({
  paginationSize = DEFAULT_PAGINATION_SIZE,
}: {
  paginationSize: number;
}) {
  const { userId, token } = useAuth();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"All" | "OnGoing" | "Completed">("All");
  const [date, setDate] = useState<Date | undefined>();

  // Queries the task data from the server with the provided filter options as query paramters.
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

  // The paginated task data
  const paginatedTask = paginatedTaskQuery.data?.data;

  // The amount of task data that exists in the server (not paginated / filtered)
  const taskCount = paginatedTaskQuery.data?.totalTaskCount;

  // Checks if the user if on the first page of the paginated task data
  const onFirstPage = page === 1;

  // Checks if the user if on the last page of the paginated task data.
  // when dividing the total task count by the pagination size, it should be equal to amount of pages that will exist page.
  const onLastPage =
    taskCount && page === Math.ceil(taskCount / paginationSize);

  // Function to go to the previous page
  const prevPage = () => {
    setPage((cur) => Math.max(cur - 1, 1));
  };

  // Function to go to the next page. Will abort then no task exists.
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
