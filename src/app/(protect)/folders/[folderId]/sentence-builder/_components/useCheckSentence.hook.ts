import { checkSentence } from "@/services/vocaularyBuilderApi/sentences";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseCheckSentenceReturnType = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  result?: string;
  checkSentence: (params: { word: string; sentence: string }) => void;
};

export function useCheckSentence(): UseCheckSentenceReturnType {
  const { isPending, isError, error, data, mutate } = useMutation<
    string,
    AxiosError<{ message: string }>,
    { word: string; sentence: string }
  >({
    mutationFn: checkSentence,
  });
  return {
    isPending: isPending,
    isError: isError,
    errorMessage: error?.response?.data.message,
    result: data,
    checkSentence: mutate,
  };
}
