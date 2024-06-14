import { Vocabulary } from "@/types/vocabulary.type";
import { useUpdateUsageStatus } from "./useUpdateUsageStatus";

type UsageStatusButtonProps = {
  vocabulary: Vocabulary;
  onUpdateStatusSuccess: () => void;
};

export function UsageStatusButton(props: UsageStatusButtonProps) {
  const { vocabulary, onUpdateStatusSuccess } = props;
  const { updateUsageStatusAsync, isPending: isUpdateStatusPending } =
    useUpdateUsageStatus();

  async function onClickToggleStatus(vocabulary: Vocabulary) {
    const usageStatus =
      vocabulary.usageStatus === "learning" ? "learned" : "learning";
    updateUsageStatusAsync({ vocabularyId: vocabulary.id, usageStatus })
      .then(() => {
        onUpdateStatusSuccess();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <button
      onClick={() => onClickToggleStatus(vocabulary)}
      disabled={isUpdateStatusPending}
    >
      {isUpdateStatusPending ? (
        <span className="loading-spinner" />
      ) : (
        <>{vocabulary.readingStatus}</>
      )}
    </button>
  );
}
