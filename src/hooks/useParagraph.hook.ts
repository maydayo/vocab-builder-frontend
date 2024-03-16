import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type WordDefinition = {
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example?: string;
    }[];
  }[];
};

type Vocabulary = {
  id: string;
  userId: string;
  word: string;
  folderId: string;
  wordDefinition: WordDefinition;
  learningTimes: number;
  status: "remembered" | "learning";
  createdAt: Date;
  lastLearnedAt: Date | null;
};
type UseParagraphResult = {
  isFetching: boolean;
  isError: boolean;
  data: { paragraph: string; vocabularyList: Vocabulary[] } | undefined;
  errorMessage?: string;
};

type FetchParagraphResponse = {
  paragraph: string;
  vocabularyList: Vocabulary[];
};

async function fetchParagraph(): Promise<FetchParagraphResponse> {
  // throw new Error("not implemented");
  return {
    paragraph:
      "As the sun dipped below the horizon, casting a warm glow over the landscape, Sarah found herself lost in the serenity of the moment. The gentle rustle of leaves in the breeze provided a soothing soundtrack to her thoughts. She marveled at the way the colors of the sky transitioned from vibrant oranges and pinks to deep purples and blues. It was a scene of pure tranquility, a fleeting moment of peace amidst the chaos of everyday life. With a contented sigh, Sarah closed her eyes, allowing herself to be fully enveloped by the beauty of the world around her.",
    vocabularyList: [
      {
        id: "",
        userId: "",
        word: "horizon",
        folderId: "",
        wordDefinition: { meanings: [] },
        learningTimes: 0,
        status: "remembered",
        createdAt: new Date(),
        lastLearnedAt: null,
      },
    ],
  };
}
export function useParagraph(): UseParagraphResult {
  const { isFetching, isError, data, error } = useQuery<
    FetchParagraphResponse,
    AxiosError<string>
  >({
    queryKey: ["paragraph"],
    queryFn: fetchParagraph,
  });
  return { isFetching, isError, errorMessage: error?.response?.data, data };
}
