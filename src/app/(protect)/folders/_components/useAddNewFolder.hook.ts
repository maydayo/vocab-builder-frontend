import { addFolder } from "@/services/vocaularyBuilderApi/folder";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseAddNewFolderResult = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  addNewFolder: (args: { folderName: string }) => Promise<void>;
};

export function useAddNewFolder(): UseAddNewFolderResult {
  const {
    isPending,
    isError,
    error,
    mutateAsync: addNewFolder,
  } = useMutation<
    void,
    AxiosError<{ message: string }>,
    { folderName: string }
  >({
    mutationFn: addFolder,
  });
  return {
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
    addNewFolder,
  };
}
