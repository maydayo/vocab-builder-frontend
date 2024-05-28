import {
  FetchParagraphResponse,
  fetchParagraph,
} from "@/services/vocaularyBuilderApi/generateParagraph";
import { Vocabulary } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseParagraphResult = {
  isPending: boolean;
  isError: boolean;
  data:
    | {
        paragraph: string;
        vocabularyList: Vocabulary[];
      }
    | undefined;
  errorMessage?: string;
  generate: () => void;
};

export type UseParagraphArgs = { folderId: string };

export function useParagraph({
  folderId,
}: UseParagraphArgs): UseParagraphResult {
  const { isPending, isError, data, error, mutate } = useMutation<
    FetchParagraphResponse,
    AxiosError<{
      message: string;
    }>
  >({
    mutationFn: () => fetchParagraph(folderId),
  });
  return {
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
    data,
    generate: mutate,
  };
}
