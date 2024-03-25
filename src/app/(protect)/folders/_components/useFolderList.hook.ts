import { getFolderList } from "@/services/vocaularyBuilderApi/folder";
import { useQuery } from "@tanstack/react-query";

type Folder = {
  folderId: string;
  folderName: string;
};

type UseFolderListResult = {
  isPending: boolean;
  isError: boolean;
  folderList: Folder[];
};

export function useFolderList(): UseFolderListResult {
  const { isPending, isError, data } = useQuery({
    queryFn: getFolderList,
    queryKey: ["getFolderList"],
  });
  return { isError, isPending, folderList: data || [] };
}
