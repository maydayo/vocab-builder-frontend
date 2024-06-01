import { getFolderProgress } from "@/services/vocaularyBuilderApi/folder";
import { useQuery } from "@tanstack/react-query";

type UseFolderProgressResult = {
  isPending: boolean;
  isError: boolean;
  progress?: {
    allVocabulary: number;
    learnedVocabulary: number;
    learnedVocabularyPercent: number;
  };
};

export function useFolderProgress(folderId: string): UseFolderProgressResult {
  const queryResult = useQuery({
    queryKey: ["useFolderProgress", folderId],
    queryFn: () => {
      return getFolderProgress(folderId);
    },
  });
  return {
    isPending: queryResult.isPending,
    isError: queryResult.isError,
    progress: queryResult.data,
  };
}
