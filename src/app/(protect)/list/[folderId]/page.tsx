"use client";
import { useGetFolder } from "@/hooks/useGetFolder";
import { useVocabularyList } from "../_components/useVocabularyList.hook";
import { useUpdateVocabularyStatus } from "../_components/useUpdateVocabularyStatus";
import { Vocabulary } from "@/types/vocabulary.type";
import { WordDefinitionPanel } from "@/components/WordDefinitionPanel";

type VocabularyListPage = { params: { folderId: string } };
export default function VocabularyListPage(props: VocabularyListPage) {
  const { folderId } = props.params;
  const { vocabularyList, invalidateQueries } = useVocabularyList(folderId);
  const { folder } = useGetFolder(folderId);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">Vocabulary List</h1>
          <h1>{folder?.folderName || ""}</h1>
        </article>
        <div className="overflow-x-auto w-full">
          <table className="table table-sm max-w-52 md:max-w-80 xl:max-w-none overflow-auto">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Word</th>
                <th>Definition</th>
                <th>Learning Times</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vocabularyList.map((vocabulary, index) => {
                return (
                  <tr key={vocabulary.id}>
                    <th>{index}</th>
                    <td>{vocabulary.word}</td>
                    <td>
                      <WordDefinitionPanel
                        definition={vocabulary.wordDefinition}
                      />
                    </td>
                    <td>{vocabulary.learningTimes}</td>
                    <td>
                      <StatusButton
                        onUpdateStatusSuccess={invalidateQueries}
                        vocabulary={vocabulary}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

type StatusButtonProps = {
  vocabulary: Vocabulary;
  onUpdateStatusSuccess: () => void;
};
function StatusButton(props: StatusButtonProps) {
  const { vocabulary, onUpdateStatusSuccess } = props;
  const { updateStatusAsync, isPending: isUpdateStatusPending } =
    useUpdateVocabularyStatus();

  async function onClickToggleStatus(vocabulary: Vocabulary) {
    const status = vocabulary.status === "learning" ? "learned" : "learning";
    updateStatusAsync({ vocabularyId: vocabulary.id, status })
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
        <>{vocabulary.status}</>
      )}
    </button>
  );
}
