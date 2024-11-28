"use client";

import { useFetchRandomVocabularyList } from "./_components/useFetchRandomVocabularyList.hook";
import { useGetFolder } from "@/hooks/useGetFolder";
import { useWriteParagraphLocal } from "./_components/useParagraph.hook";
import { HighlightedParagraph } from "./_components/HighlightParagraph";
import { ParagraphNavBar } from "./_components/ParagraphNavbar";
import { VocabularyCarousel } from "./_components/VocabularyCarousel";

type ParagraphGeneratorPageProps = { params: { folderId: string } };

export default function ParagraphGeneratorPage(
  props: ParagraphGeneratorPageProps
) {
  const { params } = props;
  const {
    getRandomVocabularyList,
    vocabularyList,
    isLoadingVocabularyList,
    isError: isVocabularyListError,
    errorMessage: vocabularyListErrorMessage,
  } = useFetchRandomVocabularyList({ folderId: params.folderId });

  const {
    writeText,
    text,
    isWriting,
    errorMessage,
    writerAiInitErrorMesssage,
  } = useWriteParagraphLocal();

  const { folder, isPending: isFolderPending } = useGetFolder(params.folderId);

  async function generate() {
    try {
      const result = await getRandomVocabularyList();
      console.log("vocabularyList", result);
      writeText(result.vocabularyList.map((v) => v.word));
    } catch (e) {
      console.error("error when generate message", e);
    }
  }

  const isLoading = isWriting || isLoadingVocabularyList;

  return (
    <>
      <ParagraphNavBar
        folderId={folder?.folderId || ""}
        folderName={folder?.folderName || ""}
      />
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">{folder ? folder.folderName : "Loading..."}</h1>
        </article>
        <div className="flex-col w-full flex justify-center items-center gap-5">
          <button
            className="btn btn-primary"
            onClick={generate}
            disabled={isLoading}
          >
            Generate Paragraph
          </button>
          <HighlightedParagraph
            paragraph={text || ""}
            vocabularyList={vocabularyList}
            onWordHover={() => {}}
          />
          <LoadingSection
            isLoadingVocabularyList={isLoadingVocabularyList}
            isWriting={isWriting}
          />
          {isLoading ? null : (
            <>
              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : null}
              {writerAiInitErrorMesssage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : null}
              {isVocabularyListError ? (
                <p className="text-red-500">{vocabularyListErrorMessage}</p>
              ) : null}
            </>
          )}
          <h2 className="pb-5 font-semibold">Vocabulary List</h2>
          <VocabularyCarousel
            vocabularyList={vocabularyList}
            isPending={vocabularyList.length === 0 || isLoading}
          />
        </div>
      </main>
    </>
  );
}

type LoadingSectionProps = {
  isLoadingVocabularyList: boolean;
  isWriting: boolean;
};
function LoadingSection(props: LoadingSectionProps) {
  const { isLoadingVocabularyList, isWriting } = props;
  let loadingText = "";
  if (isLoadingVocabularyList) {
    loadingText = "Loading Vocabulary List...";
  } else if (isWriting) {
    loadingText = "Writing...";
  }
  return <p className="text-sm text-gray-500">{loadingText}</p>;
}
