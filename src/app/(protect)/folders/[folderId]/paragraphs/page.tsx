"use client";

import { useFetchRandomVocabularyList } from "./_components/useFetchRandomVocabularyList.hook";
import { useGetFolder } from "@/hooks/useGetFolder";
import { useWriteParagraphLocal } from "./_components/useParagraph.hook";
import { HighlightedParagraph } from "./_components/HighlightParagraph";
import { ParagraphNavBar } from "./_components/ParagraphNavbar";

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
  } = useFetchRandomVocabularyList({ folderId: params.folderId });

  const {
    writeText,
    text,
    isWriting,
    errorMessage,
    writerAiInitErrorMesssage,
  } = useWriteParagraphLocal();

  const {
    folder,
    isError: isFolderError,
    isPending: isFolderPending,
  } = useGetFolder(params.folderId);

  async function generate() {
    try {
      const result = await getRandomVocabularyList();
      console.log("vocabularyList", result);
      writeText(result.vocabularyList.map((v) => v.word));
    } catch (e) {
      console.error("error when generate message", e);
    }
  }

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
            disabled={isWriting || isLoadingVocabularyList}
          >
            {!isLoadingVocabularyList && !isWriting
              ? "Generate Paragraph"
              : null}
            {isLoadingVocabularyList ? "Loading Vocabulary List" : null}
            {isWriting ? "Writing" : null}
          </button>
          <HighlightedParagraph
            paragraph={text || ""}
            vocabularyList={vocabularyList}
            onWordHover={() => {}}
          />
          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
          {writerAiInitErrorMesssage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : null}
          {isLoadingVocabularyList
            ? "...Loading"
            : vocabularyList.map((vocabulary) => (
                <div key={vocabulary.id}>
                  <p>
                    {vocabulary.word} -{" "}
                    {vocabulary.wordDefinition.meanings[0].partOfSpeech}
                  </p>
                </div>
              ))}
        </div>
      </main>
    </>
  );
}
