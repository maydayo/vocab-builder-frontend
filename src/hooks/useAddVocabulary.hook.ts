import { addVocabulary } from "@/services/vocaularyBuilderApi/vocabulary";
import { WordDefinition } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseAddVocabularyResult = {
  wordDefinition?: WordDefinition;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  add: (word: string) => void;
};
export function useAddVocabulary(): UseAddVocabularyResult {
  const {
    isPending,
    isError,
    error,
    data: wordDefinition,
    mutate: add,
  } = useMutation<WordDefinition, AxiosError<{ message: string }>, string>({
    mutationFn: addVocabulary,
  });
  console.log("error", error);
  return {
    wordDefinition,
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
    add,
  };
}
