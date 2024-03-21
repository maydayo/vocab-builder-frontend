import { useAddVocabulary } from "@/hooks/useAddVocabulary.hook";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  word: string;
};

export function VocabularyAddBox() {
  const { add, wordDefinition, isPending, isError, errorMessage } =
    useAddVocabulary();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    add(data.word);
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
        <div className="artboard-demo artboard-horizontal p-5 w-full">
          {wordDefinition.meanings.map((meaning, index) => (
            <div key={index} className="pb-3">
              <p className="italic">{meaning.partOfSpeech}</p>
              {meaning.definitions.map((definition, index) => (
                <div className="leading-tight pb-2" key={index}>
                  <p className="font-medium leading-tight">
                    {definition.definition}
                  </p>
                  {definition.example ? (
                    <p className="text-stone-600">Ex: {definition.example}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
