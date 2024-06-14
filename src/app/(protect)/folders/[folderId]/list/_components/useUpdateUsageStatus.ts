import { updateUsageStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { useMutation } from "@tanstack/react-query";

type UseUpdateUsageStatusResult = {
  updateUsageStatusAsync: (params: {
    vocabularyId: string;
    usageStatus: "learning" | "learned";
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
