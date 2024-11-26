import {
  getRandomVocabularyList,
  GetRandomVocabularyListReturnType,
} from "@/services/vocaularyBuilderApi/vocabulary";
import { Vocabulary } from "@/types/vocabulary.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseFetchRandomVocabularyListResult = {
  isLoadingVocabularyList: boolean;
  isError: boolean;
  vocabularyList: Vocabulary[];
  errorMessage?: string;
  getRandomVocabularyList: () => Promise<GetRandomVocabularyListReturnType>;
};

export type UseFetchRandomVocabularyArgs = { folderId: string };

export function useFetchRandomVocabularyList({
  folderId,
}: UseFetchRandomVocabularyArgs): UseFetchRandomVocabularyListResult {
  const { isPending, isError, data, error, mutateAsync } = useMutation<
    GetRandomVocabularyListReturnType,
    AxiosError<{ message: string }>
  >({
    mutationKey: ["getRandomVocabularyList", folderId],
    mutationFn: () => getRandomVocabularyList({ folderId }),
  });
  return {
    isLoadingVocabularyList: isPending,
    isError,
    errorMessage: error?.response?.data.message,
    vocabularyList: data?.vocabularyList || [],
    getRandomVocabularyList: mutateAsync,
  };
}
