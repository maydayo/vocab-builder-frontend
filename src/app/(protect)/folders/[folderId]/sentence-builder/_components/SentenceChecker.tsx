import { SubmitHandler, useForm } from "react-hook-form";
import { useCheckSentenceLocal } from "./useCheckSentenceLocal.hook";
import { useCheckSentence } from "./useCheckSentence.hook";

type SentenceCheckerProps = { word: string; isShow: boolean };
export function SentenceChecker(props: SentenceCheckerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ text: string }>();
  const { word, isShow = false } = props;
  const { isPending, isError, result, errorMessage, checkSentence } =
    useCheckSentence();

  const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
    checkSentence({ word, sentence: data.text });
  };

  return (
    <div className="flex-col w-full prose">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="form-control">
          <div className="label">
            <p className="label-text">
              Create your own sentence using the word <strong>{word}</strong>.
              Be creative!
            </p>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Think about that"
            disabled={!isShow}
            {...register("text", { required: true })}
          ></textarea>
        </label>

        {isError ? <span className="text-error">{errorMessage}</span> : null}
        {errors.text ? (
          <span className="text-error">Type something</span>
        ) : null}

        <button
          className="btn btn-primary join-item"
          type="submit"
          disabled={!isShow}
        >
          {isPending ? (
            <span className="loading loading-dots loading-sm "></span>
          ) : (
            "Check the result"
          )}
        </button>
      </form>
      <p>{result}</p>
    </div>
  );
}
