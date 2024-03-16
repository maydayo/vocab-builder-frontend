import { useParagraph } from "@/hooks/useParagraph.hook";

export function ParagraphGenerator() {
  const a = useParagraph();
  return (
    <>
      <button className="btn btn-primary ">
        Generate Paragraph
        {/* <span className="loading loading-dots loading-sm "></span> */}
      </button>
      <div className="artboard-demo artboard-horizontal p-5 w-full min-h-48">
        <span className="loading loading-dots loading-lg text-primary "></span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </>
  );
}
