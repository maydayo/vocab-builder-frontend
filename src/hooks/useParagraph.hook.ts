import {
  FetchParagraphResponse,
  fetchParagraph,
} from "@/services/vocaularyBuilderApi/generateParagraph";
import { Vocabulary } from "@/types/vocabulary.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseParagraphResult = {
  isFetching: boolean;
  isError: boolean;
  data: { paragraph: string; vocabularyList: Vocabulary[] } | undefined;
  errorMessage?: string;
};

export function useParagraph(): UseParagraphResult {
  const { isFetching, isError, data, error } = useQuery<
    FetchParagraphResponse,
    AxiosError<string>
  >({
    queryKey: ["paragraph"],
    queryFn: fetchParagraph,
  });
  return { isFetching, isError, errorMessage: error?.response?.data, data };
}
