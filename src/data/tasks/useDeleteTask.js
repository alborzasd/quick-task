import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "./tasksRepository";

function useDeleteTask() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteTaskMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ id }) => {
      return deleteTask(id);
    },
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return { deleteTaskMutate, isPending, error };
}

export default useDeleteTask;
