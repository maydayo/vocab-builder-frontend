import { useAIWriter } from "@/hooks/useAIWriter.hook";
import { checkSentence } from "@/services/vocaularyBuilderApi/sentences";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

type UseCheckSentenceReturnType = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  result?: string;
  checkSentence: (params: { word: string; sentence: string }) => void;
};

export function useCheckSentenceLocal(): UseCheckSentenceReturnType {
  const { writer } = useAIWriter({ length: "short", tone: "neutral" });
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [text, setText] = useState("");
  const checkSentence = async (params: { word: string; sentence: string }) => {
    const { word, sentence } = params;
    console.log("writeText", (window as any).ai.writer);
    if (!writer) {
      console.log("no writer");
      return;
    }
    setIsPending(true);
    try {
      // console.log("creating writer", (window as any).ai.writer);
      // const writer = await (window as any).ai.writer.create();
      // console.log("get a writer", writer);
      console.log("word", word);
      const stream = writer.writeStreaming(
        `Check if this sentence use this word correctly, then give an another example of this word`,
        {
          context: `words: ${word}, sentence: ${sentence}`,
        }
      );
      for await (const chunk of stream) {
        console.log("chunk", chunk);
        setText(chunk);
      }
      console.log("stream", stream);
    } catch (e) {
      setIsError(true);
      console.error(e);
    }
    setIsPending(false);
  };
  return {
    isPending: isPending,
    isError: isError,
    errorMessage: "",
    result: text,
    checkSentence: checkSentence,
  };
}
