import { updateUsageStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { LearningStatus } from "@/types/vocabulary.type";
import { useMutation } from "@tanstack/react-query";

type UseUpdateUsageStatusResult = {
  updateUsageStatusAsync: (params: {
    vocabularyId: string;
    usageStatus: LearningStatus;
  }) => Promise<void>;
  isPending: boolean;
};

export function useUpdateUsageStatus(): UseUpdateUsageStatusResult {
  const { mutateAsync: updateUsageStatusAsync, isPending } = useMutation({
    mutationFn: updateUsageStatus,
  });
  return {
    updateUsageStatusAsync,
    isPending,
  };
}
