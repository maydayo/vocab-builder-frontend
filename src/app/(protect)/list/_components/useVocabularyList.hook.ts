import { getVocabularyList } from "@/services/vocaularyBuilderApi/vocabulary";
import { Vocabulary } from "@/types/vocabulary.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseVocabularyListResult = {
  vocabularyList: Vocabulary[];
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
};
export function useVocabularyList(folderId: string): UseVocabularyListResult {
  const {
    data: vocabularyList,
    isPending,
    isError,
    error,
  } = useQuery<Vocabulary[], AxiosError<{ message: string }>>({
    queryKey: ["vocabularyList", folderId],
    queryFn: () => getVocabularyList(folderId),
  });
  return {
    vocabularyList: vocabularyList || [],
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
  };
}
