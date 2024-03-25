"use client";
import Link from "next/link";
import { useFolderList } from "./_components/useFolderList.hook";

export default function FolderListPage() {
  const { isPending, isError, folderList } = useFolderList();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1>Vocabulary Builder</h1>
        </article>
        <h2 className="text-2xl">Folder List</h2>
        <div className="flex w-full flex-wrap justify-around">
          {folderList.map((folder) => {
            return (
              <div
                key={folder.folderId}
                className="card w-96 bg-neutral text-neutral-content shadow-md p-5"
              >
                <Link href={`/folders/${folder.folderId}`}>
                  {folder.folderName}
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
