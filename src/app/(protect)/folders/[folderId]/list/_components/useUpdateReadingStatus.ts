import { updateReadingStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { useMutation } from "@tanstack/react-query";

type UseUpdateReadingStatusResult = {
  updateReadingStatusAsync: (params: {
    vocabularyId: string;
    readingStatus: "learning" | "learned";
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
