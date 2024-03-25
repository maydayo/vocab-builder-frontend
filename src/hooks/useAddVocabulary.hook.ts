import {
  AddVocabularyArgs,
  addVocabulary,
} from "@/services/vocaularyBuilderApi/vocabulary";
import { WordDefinition } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseAddVocabularyResult = {
  wordDefinition?: WordDefinition;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  add: (args: { word: string; folderId: string }) => void;
};
export function useAddVocabulary(): UseAddVocabularyResult {
  const {
    isPending,
    isError,
    error,
    data: wordDefinition,
    mutate: add,
  } = useMutation<
    WordDefinition,
    AxiosError<{ message: string }>,
    AddVocabularyArgs
  >({
    mutationFn: addVocabulary,
  });
  return {
    wordDefinition,
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
    add,
  };
}
