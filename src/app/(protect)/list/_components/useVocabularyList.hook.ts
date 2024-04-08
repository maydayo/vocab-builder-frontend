import { getVocabularyList } from "@/services/vocaularyBuilderApi/vocabulary";
import { Vocabulary } from "@/types/vocabulary.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseVocabularyListResult = {
  vocabularyList: Vocabulary[];
  invalidateQueries: () => void;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
};
export function useVocabularyList(folderId: string): UseVocabularyListResult {
  const quertClient = useQueryClient();
  const queryKey = ["vocabularyList", folderId];
  const {
    data: vocabularyList,
    isPending,
    isError,
    error,
  } = useQuery<Vocabulary[], AxiosError<{ message: string }>>({
    queryKey,
    queryFn: () => getVocabularyList(folderId),
  });
  return {
    vocabularyList: vocabularyList || [],
    invalidateQueries: () => {
      quertClient.invalidateQueries({ queryKey });
    },
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
  };
}
