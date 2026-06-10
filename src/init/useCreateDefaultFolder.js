import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ensureDefaultFolder } from "../data/folders/foldersRepository";
import { toast } from "sonner";

/**
 * if database is empty
 * create a default folder silently and invalidate cache
 *
 * if folders exist but zero or multiple default folders are there
 * set the first folder to default and show a warning
 * also invalidate cache
 *
 * if error thrown
 * show a toast
 *
 * if folders exist and and only one default folder
 * do nothing
 */
function useCreateDefaultFolder() {
  const queryClient = useQueryClient();

  const {
    mutate: createDefaultFolder,
    isPending,
    error,
  } = useMutation({
    mutationFn: ensureDefaultFolder,

    onSuccess({ newFolderCreated, dataWasCorrupted }) {
      if (newFolderCreated) {
        queryClient.invalidateQueries(["folders"]);
      }

      if (dataWasCorrupted) {
        console.warn(
          "Warning: Database has been manipulated outside app probably.",
          "The first folder is set to default",
        );
      }
    },

    onError(error) {
      let message = error.message;
      if (error?.name === "OpenFailedError") {
        message =
          "Sorry, IndexedDB is not Allowed/Supported in your browser :(";
      }
      toast.error(message, { duration: Infinity });
      console.dir(error);
    },
  });

  return { createDefaultFolder, isPending, error };
}

export default useCreateDefaultFolder;
