import { useAIWriter } from "@/hooks/useAIWriter.hook";
import { useRef, useState } from "react";

export function useWriteParagraphLocal() {
  const [isWriting, setIsWriting] = useState(false);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { writer, errorMessage: writerAiInitErrorMesssage } = useAIWriter({
    tone: "casual",
    format: "plain-text",
    length: "medium",
  });
  const divRef = useRef<HTMLDivElement>(null);

  async function writeText(words: string[]) {
    console.log("writeText", (window as any).ai.writer);
    if (!writer) {
      console.log("no writer");
      setErrorMessage("No writer");
      return;
    }

    setIsWriting(true);
    try {
      // console.log("creating writer", (window as any).ai.writer);
      // const writer = await (window as any).ai.writer.create();
      // console.log("get a writer", writer);
      console.log("words", words);
      const stream = writer.writeStreaming(
        "write a fun story with these words",
        {
          context: `words: ${words}`,
        }
      );
      for await (const chunk of stream) {
        console.log("chunk", chunk);
        if (divRef.current) {
          divRef.current.textContent = chunk;
        }
        setText(chunk);
      }
      console.log("stream", stream);
    } catch (e) {
      let errorMessage = "";
      if (typeof e === "string") {
        errorMessage = e;
      } else if (e instanceof Error) {
        errorMessage = e.message;
      }
      setErrorMessage(`Error when writing message: ${errorMessage}`);
      console.error(e);
    }
    setIsWriting(false);
  }
  return {
    writeText,
    isWriting,
    errorMessage,
    writerAiInitErrorMesssage,
    text,
    divRef,
  };
}
