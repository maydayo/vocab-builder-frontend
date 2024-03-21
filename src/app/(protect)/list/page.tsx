"use client";
import { clientCookies } from "@/libs/cookies";
import { useRouter } from "next/navigation";
import { useVocabularyList } from "./_components/useVocabularyList.hook";

export default function HomePage() {
  const router = useRouter();

  const { vocabularyList, isPending, isError } = useVocabularyList();
  const logout = () => {
    clientCookies.remove("token");
    router.push("/login");
  };

  return (
    <>
      <header className="px-5 md:px-12 lg:px-24 py-5 flex justify-end">
        <button className="btn btn-outline btn-primary btn-sm" onClick={logout}>
          Logout
        </button>
      </header>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1 className="pb-5">Vocabulary List</h1>
        </article>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Word</th>
                <th>Definition</th>
                <th>Learning Times</th>
              </tr>
            </thead>
            <tbody>
              {vocabularyList.map((vocabulary, index) => {
                return (
                  <tr key={vocabulary.id}>
                    <th>{index}</th>
                    <td>{vocabulary.word}</td>
                    <td>
                      <div className="max-w-52 md:max-w-80 lg:max-w-none overflow-auto">
                        {JSON.stringify(vocabulary.wordDefinition.meanings)}
                      </div>
                    </td>
                    <td>{vocabulary.learningTimes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
