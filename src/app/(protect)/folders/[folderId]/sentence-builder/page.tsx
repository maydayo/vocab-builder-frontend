"use client";
import { useVocabulary } from "./_components/useVocabulary.hook";
import { use, useEffect, useState } from "react";
import { SentenceBuilderNavbar } from "./_components/SentenceBuilderNavbar";
import { useGetFolder } from "@/hooks/useGetFolder";
import { SentenceChecker } from "./_components/SentenceChecker";
import { VocabularyCard } from "@/components/VocabularyCard";

type SentenceBuilderPageProps = { params: { folderId: string } };
export default function SentenceBuilderPage(props: SentenceBuilderPageProps) {
  const { params } = props;
  const { isPending, isError, vocabulary, random } = useVocabulary({
    folderId: params.folderId,
  });
  const { folder } = useGetFolder(params.folderId);

  useEffect(() => {
    random();
  }, []);

  return (
    <>
      <SentenceBuilderNavbar
        folderId={params.folderId}
        folderName={folder?.folderName || ""}
      />
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <button
          className="btn btn-primary"
          onClick={() => {
            random();
          }}
        >
          Random the word
        </button>
        <div className="prose">
          <h1 className="m-10">{vocabulary?.word}</h1>
        </div>
        <SentenceChecker word={vocabulary?.word || ""} isShow={!!vocabulary} />
        {vocabulary ? <VocabularyCard vocabulary={vocabulary} /> : null}
      </main>
    </>
  );
}

type SentenceTranslatorProps = { word: string };

function SentenceTranslator(props: SentenceTranslatorProps) {
  const { word } = props;
  const { translate } = useTranslate();
  return (
    <>
      <button onClick={() => translate(word)}>translate</button>
    </>
  );
}

function useTranslate() {
  const [translator, setTranslator] = useState<any | undefined>();
  useEffect(() => {
    const initializeAITranslator = async () => {
      console.log("initializeAITranslator", window.self);
      try {
        if (window.self.ai?.translator) {
          console.log("creating translator");
          const translator = await window.self.ai.translator.create({
            sourceLanguage: "en",
            targetLanguage: "en",
          });
          setTranslator(translator);
          console.log("done creating translator");
        } else {
          console.log("This AI Translator demo doesn't work on your browser.");
          console.log(
            "Please use Chrome >= 129. And enable the following flags:"
          );
        }
      } catch (e) {
        console.log(e);
        console.log(
          "Failed to create an AITranslator. (Rebooting Chrome may resolve the issue.)"
        );
      } finally {
        console.log("initializeAITranslator done");
      }
      return () => {
        if (translator) {
          translator.destroy();
        }
      };
    };

    initializeAITranslator();
  }, []);

  const translate = async (word: string) => {
    if (!translator) {
      console.log("no translator");
      return;
    }
    if (translator) {
      console.log("translating...");
      const translated = await translator.translate(word);
      console.log(translated);
    }
  };
  return {
    translate,
    translator,
  };
}
