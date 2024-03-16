"use client";
import { ParagraphGenerator } from "../../components/ParagraphGeneratorBox";
import { VocabularyAddBox } from "../../components/VocabularyAddBox";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
      <article className="prose">
        <h1 className="pb-5">Vocabulary Builder</h1>
      </article>
      <VocabularyAddBox />
      <ParagraphGenerator />
    </main>
  );
}
