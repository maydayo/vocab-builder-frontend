import { Vocabulary } from "@/types/vocabulary.type";
import { useUpdateReadingStatus } from "./useUpdateReadingStatus";

type ReadingStatusButtonProps = {
  vocabulary: Vocabulary;
  onUpdateStatusSuccess: () => void;
};

export function ReadingStatusButton(props: ReadingStatusButtonProps) {
  const { vocabulary, onUpdateStatusSuccess } = props;
  const { updateReadingStatusAsync, isPending: isUpdateStatusPending } =
    useUpdateReadingStatus();

  async function onClickToggleStatus(vocabulary: Vocabulary) {
    const readingStatus =
      vocabulary.readingStatus === "learning" ? "learned" : "learning";
    updateReadingStatusAsync({ vocabularyId: vocabulary.id, readingStatus })
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
