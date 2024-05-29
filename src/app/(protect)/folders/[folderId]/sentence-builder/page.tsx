"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useVocabulary } from "./_components/useVocabulary.hook";
import { useCheckSentence } from "./_components/useCheckSentence.hook";

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
        <button onClick={random}>Random</button>
        <div>{vocabulary?.word}</div>
        {vocabulary ? <SentenceChecker word={vocabulary.word} /> : null}
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
  const { isPending, isError, result, errorMessage, checkSentence } =
    useCheckSentence();

  const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
    checkSentence({ word, sentence: data.text });
  };

  return (
    <div className="flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Create your own sentence!</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
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
            "Add"
          )}
        </button>
      </form>
      <div>{result}</div>
    </div>
  );
}
