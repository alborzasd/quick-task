import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFolder } from "./foldersRepository";

function useUpdateFolder() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFolderMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({id, updatedFolder}) => {
      return updateFolder(id, updatedFolder);
    },
    onSuccess() {
      queryClient.invalidateQueries(["folders"]);
    },
  });

  return { updateFolderMutate, isPending, error };
}

export default useUpdateFolder;
