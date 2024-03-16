import { useParagraph } from "@/hooks/useParagraph.hook";

export function ParagraphGenerator() {
  const { isFetching, isError, data, errorMessage } = useParagraph();
  return (
    <>
      <button className="btn btn-primary ">
        Generate Paragraph
        {/* <span className="loading loading-dots loading-sm "></span> */}
      </button>
      <div className="artboard-demo artboard-horizontal p-5 w-full min-h-48">
        {isFetching ? (
          <span className="loading loading-dots loading-lg text-primary"></span>
        ) : null}
        <p>{data?.paragraph} </p>
        {isError ? <p className="text-red-800">{errorMessage}</p> : null}
      </div>
    </>
  );
}
