"use client";

import { ParagraphGenerator } from "@/components/ParagraphGeneratorBox";
import { VocabularyAddBox } from "@/components/VocabularyAddBox";
import { useGetFolder } from "@/hooks/useGetFolder";
import Link from "next/link";

type HomePageProps = { params: { folderId: string } };
export default function HomePage(props: HomePageProps) {
  const { folderId } = props.params;

  const { folder } = useGetFolder(folderId);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">{folder?.folderName}</h1>
        </article>
        <>Progress</>
        <div className="flex-col w-full flex justify-center items-center gap-5">
          <div className="card w-96 bg-base-100 shadow-md p-5">
            <Link href={`${folderId}/list`}>View Vocabulary List</Link>
          </div>
          <div className="card w-96 bg-base-100 shadow-md p-5">
            <Link href={`${folderId}/paragraphs`}>
              Learn Vocabulary From Context
            </Link>
          </div>
          <div className="card w-96 bg-base-100 shadow-md p-5">
            <Link href={`${folderId}/sentence-builder`}>
              Build Your Sentence From Vocabulary
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
