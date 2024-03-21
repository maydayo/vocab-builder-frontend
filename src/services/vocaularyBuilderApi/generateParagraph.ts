import { fetchClient } from "@/libs/fetchClient";
import { Vocabulary } from "@/types/vocabulary.type";

export type FetchParagraphResponse = {
  paragraph: string;
  vocabularyList: Vocabulary[];
};

export async function fetchParagraph(): Promise<FetchParagraphResponse> {
  const response = await fetchClient.get<FetchParagraphResponse>(
    "/paragraphs/generate"
  );
  return response.data;
}
