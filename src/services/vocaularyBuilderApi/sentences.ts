import { fetchClient } from "@/libs/fetchClient";

type CheckSentenceInput = {
  sentence: string;
  word: string;
};

export async function checkSentence(
  input: CheckSentenceInput
): Promise<string> {
  const response = await fetchClient.post<string>(`/sentences/check`, input);
  return response.data;
}
