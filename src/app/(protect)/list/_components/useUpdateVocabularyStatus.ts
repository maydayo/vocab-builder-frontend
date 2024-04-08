import { updateVocabularyStatus } from "@/services/vocaularyBuilderApi/vocabulary";
import { useMutation } from "@tanstack/react-query";

type UseUpdateVocabularyStatusResult = {
  updateStatusAsync: (params: {
    vocabularyId: string;
    status: "learning" | "learned";
  }) => Promise<void>;
  isPending: boolean;
};

export function useUpdateVocabularyStatus(): UseUpdateVocabularyStatusResult {
  const { mutateAsync: updateStatusAsync, isPending } = useMutation({
    mutationFn: updateVocabularyStatus,
  });
  return {
    updateStatusAsync,
    isPending,
  };
}
