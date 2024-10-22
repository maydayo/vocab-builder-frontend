import {
  getRandomVocabularyList,
  GetRandomVocabularyListReturnType,
} from "@/services/vocaularyBuilderApi/vocabulary";
import { Vocabulary } from "@/types/vocabulary.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type UseParagraphResult = {
  isLoadingVocabularyList: boolean;
  isWriting: boolean;
  isError: boolean;
  vocabularyList: Vocabulary[];
  paragraph: string | undefined;
  errorMessage?: string;
  generate: () => void;
};

export type UseParagraphArgs = { folderId: string };

export function useParagraph({
  folderId,
}: UseParagraphArgs): UseParagraphResult {
  const { isPending, isError, data, error, refetch } = useQuery<
    GetRandomVocabularyListReturnType,
    AxiosError<{ message: string }>
  >({
    queryKey: ["getRandomVocabularyList", folderId],
    queryFn: () => getRandomVocabularyList({ folderId }),
    enabled: false,
  });
  const { writeText, text, isWriting } = useWriteParagraphLocal();
  const generate = async () => {
    await refetch();
    if (data) {
      writeText(data.wordList);
    }
  };
  return {
    isLoadingVocabularyList: isPending,
    isWriting,
    isError,
    errorMessage: error?.response?.data.message,
    paragraph: text,
    vocabularyList: data?.vocabularyList || [],
    generate,
  };
}

function useWriteParagraphLocal() {
  const [isWriting, setIsWriting] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<unknown>();
  const { writer } = useAIWriter();

  async function writeText(words: string[]) {
    console.log("writeText", (window as any).ai.writer);

    setIsWriting(true);
    try {
      // console.log("creating writer", (window as any).ai.writer);
      // const writer = await (window as any).ai.writer.create();
      // console.log("get a writer", writer);
      const stream = writer.writeStreaming(
        "write a fun story with these words",
        {
          context: `words: ${words}`,
        }
      );
      for await (const chunk of stream) {
        setText(chunk);
      }
      console.log("stream", stream);
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setIsWriting(false);
  }
  return {
    writeText,
    isWriting,
    error,
    text,
  };
}

declare global {
  interface Window {
    ai?: {
      writer: {
        create: (options: any) => Promise<{ destroy: () => void }>;
      };
      rewriter: any;
    };
  }
}

function useAIWriter() {
  const [writer, setWriter] = useState<any | undefined>();

  useEffect(() => {
    const initializeAIWriter = async () => {
      console.log("initializeAIWriter");
      try {
        if (window.self.ai?.writer && window.self.ai?.rewriter) {
          const writer = await window.self.ai.writer.create({
            tone: "informal",
          });
          setWriter(writer);
          console.log(writer);
        } else {
          console.log(
            "This AIWriter/AIRewriter demo doesn't work on your browser."
          );
          console.log(
            "Please use Chrome >= 129. And enable the following flags:"
          );
          console.log("  chrome://flags/#writer-api-for-gemini-nano");
          console.log("  chrome://flags/#rewriter-api-for-gemini-nano");
          console.log("  chrome://flags/#optimization-guide-on-device-model");
        }
      } catch (e) {
        console.log(e);
        console.log(
          "Failed to create an AIWriter. (Rebooting Chrome may resolve the issue.)"
        );
      } finally {
        console.log("initializeAIWriter done");
      }
      return () => {
        if (writer) {
          writer.destroy();
        }
      };
    };

    initializeAIWriter();
  }, []);
  return { writer };
}
