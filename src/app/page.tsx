import { ParagraphGenerator } from "./_components/ParagraphGeneratorBox";
import { VocabularyAddBox } from "./_components/VocabularyAddBox";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <VocabularyAddBox />
      <ParagraphGenerator />
    </main>
  );
}
