import { useQuery } from "@tanstack/react-query";
import { getFolders } from "./foldersRepository";

export function useFolders() {
  const {
    data: folders = [],
    error,
    isPending,
    isError,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,

    // queryFn: async () => {
    //   await new Promise(res => setTimeout(res, 2000));
    //   throw new Error("Test Error");
    // }
  });

  return { folders, error, isPending, isError, status, fetchStatus };
}
