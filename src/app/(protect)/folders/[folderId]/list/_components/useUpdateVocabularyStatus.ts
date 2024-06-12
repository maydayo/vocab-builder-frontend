import { updateVocabularyReadingStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { useMutation } from "@tanstack/react-query";

type UseUpdateVocabularyReadingStatusResult = {
  updateReadingStatusAsync: (params: {
    vocabularyId: string;
    readingStatus: "learning" | "learned";
  }) => Promise<void>;
  isPending: boolean;
};

export function useUpdateVocabularyReadingStatus(): UseUpdateVocabularyReadingStatusResult {
  const { mutateAsync: updateReadingStatusAsync, isPending } = useMutation({
    mutationFn: updateVocabularyReadingStatus,
  });
  return {
    updateReadingStatusAsync,
    isPending,
  };
}
