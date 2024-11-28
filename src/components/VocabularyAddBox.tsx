import { useAddVocabulary } from "@/hooks/useAddVocabulary.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { VocabularyCard } from "./VocabularyCard";
import { useState } from "react";

type Inputs = {
  word: string;
};

type VocabularyAddBoxProps = { folderId: string };
export function VocabularyAddBox(props: VocabularyAddBoxProps) {
  const { folderId } = props;
  const { add, wordDefinition, isPending, isError, errorMessage } =
    useAddVocabulary();
  const [showWord, setShowWord] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    add({ word: data.word, folderId });
    setShowWord(getValues("word"));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <form className="join" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add your new vocabulary"
          className="input input-bordered input-primary w-72 join-item"
          {...register("word", { required: true })}
        />
        <button className="btn btn-primary join-item" type="submit">
          {isPending ? (
            <span className="loading loading-dots loading-sm "></span>
          ) : (
            "Add"
          )}
        </button>
      </form>
      {errors.word && <span className="text-error">Word is required</span>}
      {isError ? <span className="text-error">{errorMessage}</span> : null}
      {!isPending && wordDefinition ? (
        <VocabularyCard
          wordDefinition={wordDefinition}
          word={showWord}
          isShowAction={false}
        />
      ) : null}
    </div>
  );
}
