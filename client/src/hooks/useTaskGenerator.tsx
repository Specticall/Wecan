import { TMood } from "@/context/MoodContext";
import { generateTask } from "@/data/dummyTasksEndpoint";
import { useQuery } from "react-query";

export default function useTaskGenerator({ mood }: { mood?: TMood }) {
  const generator = useQuery({
    queryKey: ["generatedTask"],
    queryFn: () => generateTask(mood),
  });

  const generateNewTask = () => {
    generator.refetch();
  };

  const generatedTask = generator.data;

  const generatorState = {
    isLoading: generator.isLoading || generator.isRefetching,
    isError: generator.isError,
    isSuccess: generator.isSuccess,
  };

  return { generateNewTask, generatorState, generatedTask };
}
