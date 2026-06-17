import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "./tasksRepository";

function useUpdateTask() {
  const queryClient = useQueryClient();

  const {
    mutate: updateTaskMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ id, updatedTask }) => {
      return updateTask(id, updatedTask);
    },
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return { updateTaskMutate, isPending, error };
}

export default useUpdateTask;
