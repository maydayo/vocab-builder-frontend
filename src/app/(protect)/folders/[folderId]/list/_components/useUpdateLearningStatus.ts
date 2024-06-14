import { updateLearningStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { LearningStatus } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";

type UseUpdateLearningStatusResult = {
  updateLearningStatusAsync: (params: {
    vocabularyId: string;
    learningStatus: LearningStatus;
  }) => Promise<void>;
  isPending: boolean;
};

export function useUpdateLearningStatus(): UseUpdateLearningStatusResult {
  const { mutateAsync: updateLearningStatusAsync, isPending } = useMutation({
    mutationFn: updateLearningStatus,
  });
  return {
    updateLearningStatusAsync,
    isPending,
  };
}
