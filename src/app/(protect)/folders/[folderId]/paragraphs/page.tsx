"use client";

import { ParagraphGenerator } from "@/components/ParagraphGeneratorBox";

type ParagraphGeneratorPageProps = { params: { folderId: string } };

export default function ParagraphGeneratorPage(
  props: ParagraphGeneratorPageProps
) {
  const { params } = props;
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">Topic</h1>
        </article>
        <div className="flex-col w-full flex justify-center items-center gap-5">
          <ParagraphGenerator folderId={params.folderId} />
        </div>
      </main>
    </>
  );
}
