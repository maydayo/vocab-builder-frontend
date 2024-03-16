import { ParagraphGenerator } from "../../components/ParagraphGeneratorBox";
import { VocabularyAddBox } from "../../components/VocabularyAddBox";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <VocabularyAddBox />
      <ParagraphGenerator />
    </main>
  );
}
