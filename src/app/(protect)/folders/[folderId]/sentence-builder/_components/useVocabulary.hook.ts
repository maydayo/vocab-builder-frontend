import { getRandomVocabulary } from "@/services/vocaularyBuilderApi/vocabulary";
import { Vocabulary } from "@/types/vocabulary.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseVocabularyReturnType = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  vocabulary?: Vocabulary;
  random: () => void;
};

export function useVocabulary({
  folderId,
}: {
  folderId: string;
}): UseVocabularyReturnType {
  const { refetch, isError, isPending, data, error } = useQuery<
    Vocabulary,
    AxiosError<{ message: string }>
  >({
    queryKey: ["vocabulary", folderId],
    queryFn: () => getRandomVocabulary({ folderId }),
    enabled: false,
  });
  return {
    isPending,
    isError,
    errorMessage: error?.response?.data.message,
    vocabulary: data,
    random: () => {
      console.log("refetch");
      refetch();
    },
  };
}
