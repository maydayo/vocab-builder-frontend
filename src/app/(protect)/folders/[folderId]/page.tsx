"use client";

import { useGetFolder } from "@/hooks/useGetFolder";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useFolderProgress } from "../_components/useFolderProgress.hook";
import { DirectoryNavbar } from "./_components/DirectoryNavbar";

type DirectoryPageProps = { params: { folderId: string } };
export default function DirectoryPage(props: DirectoryPageProps) {
  const { folderId } = props.params;

  const { folder } = useGetFolder(folderId);
  const { progress } = useFolderProgress(folderId);

  return (
    <>
      <DirectoryNavbar
        folderName={folder?.folderName || ""}
        folderId={folderId}
      />
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">{folder?.folderName}</h1>
        </article>
        <>
          <div
            className="radial-progress text-primary"
            style={
              {
                "--value": progress?.learnedVocabularyPercent,
                "--size": "10rem",
                "--thickness": "1.5rem",
              } as DetailedHTMLProps<
                HTMLAttributes<HTMLDivElement>,
                HTMLDivElement
              >
            }
            role="progressbar"
          >
            {progress?.learnedVocabularyPercent}%
          </div>
          <p className="mb-3 font-semibold">
            You&apos;ve learned {progress?.learnedVocabulary} words from
            {progress?.allVocabulary} words 🥳
          </p>
        </>

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
