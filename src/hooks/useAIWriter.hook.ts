import { useEffect, useState } from "react";

declare global {
  interface Window {
    ai?: {
      writer: {
        create: (options: any) => Promise<{ destroy: () => void }>;
      };
      rewriter: any;
      translator: any;
    };
  }
}
type UseAIWriterArgs = {
  tone?: "formal" | "neutral" | "casual";
  format?: "plain-text" | "markdown";
  length?: "short" | "medium" | "long";
};
export function useAIWriter(args: UseAIWriterArgs) {
  const [writer, setWriter] = useState<any | undefined>();
  const { tone = "casual", format = "plain-text", length = "medium" } = args;
  useEffect(() => {
    const initializeAIWriter = async () => {
      try {
        if (window.self.ai?.writer && window.self.ai?.rewriter) {
          const writer = await window.self.ai.writer.create({
            tone,
            format,
            length,
          });
          setWriter(writer);
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
  }, [tone, format, length]);
  return { writer };
}
