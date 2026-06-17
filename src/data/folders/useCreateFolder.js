import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "./foldersRepository";

function useCreateFolder() {
  const queryClient = useQueryClient();

  const {
    mutate: createFolderMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: createFolder,
    onSuccess() {
      queryClient.invalidateQueries(["folders"]);
    },
  });

  return { createFolderMutate, isPending, error };
}

export default useCreateFolder;
