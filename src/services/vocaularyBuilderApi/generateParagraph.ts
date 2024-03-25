import { fetchClient } from "@/libs/fetchClient";
import { Vocabulary } from "@/types/vocabulary.type";

export type FetchParagraphResponse = {
  paragraph: string;
  vocabularyList: Vocabulary[];
};

export async function fetchParagraph(
  folderId: string
): Promise<FetchParagraphResponse> {
  const response = await fetchClient.get<FetchParagraphResponse>(
    `/paragraphs/generate?folderId=${folderId}`
  );
  return response.data;
}
