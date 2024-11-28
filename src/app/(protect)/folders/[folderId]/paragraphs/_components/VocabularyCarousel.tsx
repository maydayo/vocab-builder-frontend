import { Vocabulary } from "@/types/vocabulary.type";

type VocabularyCarouselProps = {
  vocabularyList: Vocabulary[];
};
export function VocabularyCarousel(props: VocabularyCarouselProps) {
  const vocabularyList = props.vocabularyList;
  const isEmpty = vocabularyList.length === 0;
  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-lg min-w-lg space-x-4 p-4">
      {isEmpty
        ? [...Array(5)].map((_, index) => <CarouselSkeletonItem key={index} />)
        : vocabularyList.map((vocabulary) => (
            <CarouselItem vocabulary={vocabulary} key={vocabulary.id} />
          ))}
    </div>
  );
}

type CarouselItemProps = { vocabulary?: Vocabulary };
function CarouselItem(props: CarouselItemProps) {
  const { vocabulary } = props;
  return (
    <div className="carousel-item">
      <div className="card bg-base-100 w-96 h-80 shadow-xl">
        <div className="card-body">
          <div>
            <h2 className="card-title">{vocabulary?.word}</h2>
          </div>
          <div className="h-40 overflow-y-scroll prose">
            <ul className="list-decimal">
              {vocabulary?.wordDefinition.meanings.map((meaning, index) => (
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
          <div className="card-actions justify-between">
            <button className="btn btn-md btn-secondary">
              Still don't get it
            </button>
            <button className="btn btn-md btn-primary">
              I remembered this{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselSkeletonItem() {
  return (
    <div className="carousel-item ">
      <div className="card skeleton h-80 w-96 shrink-0"></div>
    </div>
  );
}
