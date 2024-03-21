"use client";
import { clientCookies } from "@/libs/cookies";
import { ParagraphGenerator } from "../../components/ParagraphGeneratorBox";
import { VocabularyAddBox } from "../../components/VocabularyAddBox";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
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
          <h1 className="pb-5">Vocabulary Builder</h1>
        </article>
        <VocabularyAddBox />
        <ParagraphGenerator />
      </main>
    </>
  );
}
