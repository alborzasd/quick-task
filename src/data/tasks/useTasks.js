import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./tasksRepository";

export function useTasks() {
  const {
    data: tasks = [],
    error,
    isPending,
    isError,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return { tasks, error, isPending, isError, status, fetchStatus };
}
