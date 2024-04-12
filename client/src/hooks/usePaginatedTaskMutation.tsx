import { useAuth } from "@/context/AuthContext";
import { useQuery } from "react-query";

export default function usePaginatedTaskMutation() {
  const { userId, token } = useAuth();

  const paginatedTaskQuery = useQuery({
    queryKey: ["paginatedTask", userId, token],
    queryFn: () => {},
  });

  return { paginatedTaskQuery };
}
