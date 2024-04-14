import { WordDefinition } from "@/types/vocabulary.type";

type WordDefinitionProps = { definition: WordDefinition };
export function WordDefinitionPanel(props: WordDefinitionProps) {
  const { definition } = props;
  return (
    <div className="flex flex-col gap-3">
      {definition.meanings.map((meaning, index) => {
        return (
          <div key={index}>
            <p className="italic">{meaning.partOfSpeech}</p>
            <div className="flex flex-col gap-2">
              {meaning.definitions.map((definition, index) => (
                <div className="leading-tight" key={index}>
                  <p className="font-medium leading-tight">
                    {definition.definition}
                  </p>
                  {definition.example ? (
                    <p className="text-stone-600" key={index}>
                      {`"${definition.example}"`}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
