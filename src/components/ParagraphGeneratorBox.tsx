import { Vocabulary, useParagraph } from "@/hooks/useParagraph.hook";

export function ParagraphGenerator() {
  const { isFetching, isError, data, errorMessage } = useParagraph();
  return (
    <>
      <button className="btn btn-primary ">
        Generate Paragraph
        {/* <span className="loading loading-dots loading-sm "></span> */}
      </button>
      <div className="artboard-demo artboard-horizontal p-5 w-full min-h-48">
        {isFetching ? (
          <span className="loading loading-dots loading-lg text-primary"></span>
        ) : null}
        {data ? (
          <HighlightedParagraph
            paragraph={data.paragraph}
            vocabularyList={data.vocabularyList}
            onWordClick={() => {}}
          />
        ) : null}
        {isError ? <p className="text-red-800">{errorMessage}</p> : null}
      </div>
    </>
  );
}

type HighlightedParagraphProps = {
  paragraph: string;
  vocabularyList: Vocabulary[];
  onWordClick: (word: string) => void;
};
const HighlightedParagraph = (props: HighlightedParagraphProps) => {
  const { paragraph, vocabularyList, onWordClick } = props;
  console.log(vocabularyList, splitIntoWords(paragraph));
  function splitIntoWords(text: string): string[] {
    return text.split(/\b/);
  }

  function isWordInVocabulary(word: string): boolean {
    return vocabularyList.some(
      (vocabulary) => vocabulary.word.toLowerCase() === word.toLowerCase()
    );
  }

  const renderHighlightedWords = (words: string[]) => {
    return words.map((word, index) => {
      if (isWordInVocabulary(word)) {
        return (
          <code
            key={index}
            className="bg-secondary cursor-pointer"
            onClick={() => onWordClick(word)}
          >
            {word}
          </code>
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
