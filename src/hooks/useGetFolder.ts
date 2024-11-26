import { getFolder } from "@/services/vocaularyBuilderApi/folder";
import { Folder } from "@/types/folder.type";
import { useQuery } from "@tanstack/react-query";

type UserGetFolderResult = {
  isPending: boolean;
  isError: boolean;
  folder?: Folder;
};
export function useGetFolder(folderId: string): UserGetFolderResult {
  const {
    isPending,
    isError,
    data: folder,
  } = useQuery({
    queryKey: ["getFolder", folderId],
    queryFn: () => getFolder(folderId),
    staleTime: 1000 * 5,
  });
  return { isError, isPending, folder };
}
