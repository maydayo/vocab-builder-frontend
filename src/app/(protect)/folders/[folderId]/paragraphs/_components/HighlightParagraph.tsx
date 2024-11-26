import { WordDefinitionPanel } from "@/app/(protect)/folders/[folderId]/paragraphs/_components/WordDefinitionPanel";
import { Vocabulary } from "@/types/vocabulary.type";

type HighlightedParagraphProps = {
  paragraph: string;
  vocabularyList: Vocabulary[];
  onWordHover: (word: string) => void;
};
export const HighlightedParagraph = (props: HighlightedParagraphProps) => {
  const { paragraph, vocabularyList, onWordHover: onWordClick } = props;
  function splitIntoWords(text: string): string[] {
    return text.split(/\b/);
  }

  const getVocabularyFromWord = (word: string) => {
    return vocabularyList.find((vocabulary) => word === vocabulary.word);
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
