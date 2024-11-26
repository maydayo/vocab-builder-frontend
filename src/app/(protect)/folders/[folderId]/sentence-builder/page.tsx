"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useVocabulary } from "./_components/useVocabulary.hook";
import { useEffect, useState } from "react";
import { useCheckSentenceLocal } from "./_components/useCheckSentenceLocal.hook";

type SentenceBuilderPageProps = { params: { folderId: string } };
export default function SentenceBuilderPage(props: SentenceBuilderPageProps) {
  const { params } = props;
  const { isPending, isError, vocabulary, random } = useVocabulary({
    folderId: params.folderId,
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <>RandomWord</>
        <button
          onClick={() => {
            console.log("click");
            random();
          }}
        >
          Random
        </button>
        <div>{vocabulary?.word}</div>
        {vocabulary ? <SentenceChecker word={vocabulary.word} /> : null}
        <SentenceTranslator word={vocabulary?.word || ""} />
      </main>
    </>
  );
}

type SentenceCheckerProps = { word: string };
function SentenceChecker(props: SentenceCheckerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>();
  const { word } = props;
  // const { isPending, isError, result, errorMessage, checkSentence } =
  //   useCheckSentence();
  const { isPending, isError, result, errorMessage, checkSentence } =
    useCheckSentenceLocal();

  const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
    checkSentence({ word, sentence: data.text });
  };

  return (
    <div className="flex-col w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Create your own sentence!</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Think about that"
            {...register("text", { required: true })}
          ></textarea>
        </label>

        {isError ? <span className="text-error">{errorMessage}</span> : null}
        {errors.text ? (
          <span className="text-error">Type something</span>
        ) : null}

        <button className="btn btn-primary join-item" type="submit">
          {isPending ? (
            <span className="loading loading-dots loading-sm "></span>
          ) : (
            "Check the result"
          )}
        </button>
      </form>
      <div>{result}</div>
    </div>
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
