import { Vocabulary } from "@/types/vocabulary.type";

type VocabularyCardProps = { vocabulary: Vocabulary };
export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  return (
    <div className="card bg-base-100 w-96 h-80 shadow-xl">
      <div className="card-body">
        <div>
          <h2 className="card-title">{vocabulary?.word}</h2>
        </div>
        <div className="h-40 overflow-y-scroll prose">
          <ul className="list-decimal">
            {vocabulary.wordDefinition.meanings.map((meaning, index) => (
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
        <div className="card-actions justify-end">
          <button className="btn btn-md btn-primary btn-outline">
            I remembered this{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
