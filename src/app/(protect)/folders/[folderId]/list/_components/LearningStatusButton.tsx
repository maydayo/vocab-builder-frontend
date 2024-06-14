import { Vocabulary } from "@/types/vocabulary.type";
import { useUpdateLearningStatus } from "./useUpdateLearningStatus";

type LearningStatusButtonProps = {
  vocabulary: Vocabulary;
  onUpdateStatusSuccess: () => void;
};

export function LearningStatusButton(props: LearningStatusButtonProps) {
  const { vocabulary, onUpdateStatusSuccess } = props;
  const { updateLearningStatusAsync, isPending: isUpdateStatusPending } =
    useUpdateLearningStatus();

  async function onClickToggleStatus(vocabulary: Vocabulary) {
    const learningStatus =
      vocabulary.learningStatus === "learning" ? "learned" : "learning";
    updateLearningStatusAsync({ vocabularyId: vocabulary.id, learningStatus })
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
        <>{vocabulary.learningStatus}</>
      )}
    </button>
  );
}
