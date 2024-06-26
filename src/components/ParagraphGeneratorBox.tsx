import { useParagraph } from "@/hooks/useParagraph.hook";
import { Vocabulary } from "@/types/vocabulary.type";
import { WordDefinitionPanel } from "./WordDefinitionPanel";

type ParagraphGeneratorProps = { folderId: string };
export function ParagraphGenerator(props: ParagraphGeneratorProps) {
  const { folderId } = props;
  const { isPending, isError, data, errorMessage, generate } = useParagraph({
    folderId,
  });
  return (
    <>
      <button className="btn btn-primary" onClick={generate}>
        Generate Paragraph
        {/* <span className="loading loading-dots loading-sm "></span> */}
      </button>
      <div className="artboard-demo artboard-horizontal p-5 w-full min-h-48">
        {isPending ? (
          <span className="loading loading-dots loading-lg text-primary"></span>
        ) : null}
        {!isPending && data ? (
          <HighlightedParagraph
            paragraph={data.paragraph}
            vocabularyList={data.vocabularyList}
            onWordHover={() => {}}
          />
        ) : null}
        {isError ? <p className="text-error">{errorMessage}</p> : null}
      </div>
    </>
  );
}

type HighlightedParagraphProps = {
  paragraph: string;
  vocabularyList: Vocabulary[];
  onWordHover: (word: string) => void;
};
const HighlightedParagraph = (props: HighlightedParagraphProps) => {
  const { paragraph, vocabularyList, onWordHover: onWordClick } = props;
  function splitIntoWords(text: string): string[] {
    return text.split(/\b/);
  }

  const getVocabularyFromWord = (word: string) => {
    return vocabularyList.find((vocabulary) =>
      vocabulary.matchedWordList.includes(word)
    );
  };

  const renderHighlightedWords = (words: string[]) => {
    return words.map((word, index) => {
      const vocabulary: Vocabulary | undefined = getVocabularyFromWord(word);
      if (vocabulary) {
        return (
          <>
            <div className="dropdown dropdown-hover" key={index}>
              <div tabIndex={0}>
                <code
                  className="bg-secondary cursor-pointer"
                  onClick={() => onWordClick(word)}
                >
                  {word}
                </code>
              </div>
              <ul
                tabIndex={0}
                className="text-sm dropdown-content z-[1] p-2 max-h-60 overflow-y-scroll shadow bg-base-100 rounded-box w-64"
              >
                <WordDefinitionPanel
                  definition={vocabulary.wordDefinition}
                  key={index}
                />
              </ul>
            </div>
          </>
        );
      } else {
        return <span key={index}>{word}</span>;
      }
    });
  };

  return (
    <article className="prose">
      {renderHighlightedWords(splitIntoWords(paragraph))}
    </article>
  );
};
