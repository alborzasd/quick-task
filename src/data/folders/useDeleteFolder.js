import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "./foldersRepository";

function useDeleteFolder() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFolderMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({id}) => {
      return deleteFolder(id);
    },
    onSuccess() {
      queryClient.invalidateQueries(["folders", "tasks"]);
    },
  });

  return { deleteFolderMutate, isPending, error };
}

export default useDeleteFolder;
