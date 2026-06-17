import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "./tasksRepository";

function useCreateTask() {
  const queryClient = useQueryClient();

  const {
    mutate: createTaskMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: createTask,
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return { createTaskMutate, isPending, error };
}

export default useCreateTask;
