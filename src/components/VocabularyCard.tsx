import { WordDefinition } from "@/types/vocabulary.type";

type VocabularyCardProps = {
  word: string;
  wordDefinition: WordDefinition;
  isShowAction?: boolean;
};
export function VocabularyCard({
  word,
  wordDefinition,
  isShowAction = true,
}: VocabularyCardProps) {
  return (
    <div className="card bg-base-100 w-96 h-80 shadow-xl">
      <div className="card-body">
        <div>
          <h2 className="card-title">{word}</h2>
        </div>
        <div
          className={`${
            isShowAction ? "h-40" : "h-52"
          } overflow-y-scroll prose`}
        >
          <ul className="list-decimal">
            {wordDefinition.meanings.map((meaning, index) => (
              <li key={index} className="pb-3">
                <p className="text-sm">{meaning.partOfSpeech}</p>
                <ul>
                  {meaning.definitions.map((definition, index) => (
                    <>
                      <li key={index}>
                        <p className="text-sm">{definition.definition}</p>
                      </li>
                      <p className="text-sm italic">{definition.example}</p>
                    </>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {isShowAction ? (
          <div className="card-actions justify-end">
            <button className="btn btn-md btn-primary btn-outline">
              I remembered this{" "}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
