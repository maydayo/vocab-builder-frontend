import { VocabularyCard } from "@/components/VocabularyCard";
import { Vocabulary } from "@/types/vocabulary.type";

type VocabularyCarouselProps = {
  vocabularyList: Vocabulary[];
  isPending: boolean;
};
export function VocabularyCarousel(props: VocabularyCarouselProps) {
  const { vocabularyList, isPending } = props;
  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-lg min-w-lg space-x-4 p-4">
      {isPending
        ? [...Array(5)].map((_, index) => <CarouselSkeletonItem key={index} />)
        : vocabularyList.map((vocabulary) => (
            <CarouselItem vocabulary={vocabulary} key={vocabulary.id} />
          ))}
    </div>
  );
}

type CarouselItemProps = { vocabulary: Vocabulary };
function CarouselItem(props: CarouselItemProps) {
  const { vocabulary } = props;
  return (
    <div className="carousel-item">
      <VocabularyCard vocabulary={vocabulary} />
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
