import { updateReadingStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { LearningStatus } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";

type UseUpdateReadingStatusResult = {
  updateReadingStatusAsync: (params: {
    vocabularyId: string;
    readingStatus: LearningStatus;
  }) => Promise<void>;
  isPending: boolean;
};

export function useUpdateReadingStatus(): UseUpdateReadingStatusResult {
  const { mutateAsync: updateReadingStatusAsync, isPending } = useMutation({
    mutationFn: updateReadingStatus,
  });
  return {
    updateReadingStatusAsync,
    isPending,
  };
}
