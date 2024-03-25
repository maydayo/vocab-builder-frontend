import { getFolderList } from "@/services/vocaularyBuilderApi/folder";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Folder = {
  folderId: string;
  folderName: string;
};

type UseFolderListResult = {
  isPending: boolean;
  isError: boolean;
  folderList: Folder[];
  updateFolderList: () => void;
};

export function useFolderList(): UseFolderListResult {
  const queryKey = ["getFolderList"];
  const { isPending, isError, data, refetch } = useQuery({
    queryFn: getFolderList,
    queryKey,
  });
  const queryClient = useQueryClient();

  function updateFolderList() {
    queryClient.invalidateQueries({ queryKey });
  }

  return { isError, isPending, folderList: data || [], updateFolderList };
}
