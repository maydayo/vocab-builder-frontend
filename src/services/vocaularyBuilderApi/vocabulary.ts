import { fetchClient } from "@/libs/fetchClient";
import { WordDefinition } from "@/types/vocabulary.type";

export type AddVocabularyResponse = {
  wordDefinition: WordDefinition;
};
export async function addVocabulary(word: string): Promise<WordDefinition> {
  const response = await fetchClient.put<AddVocabularyResponse>(
    `/vocabularies/${word}`
  );
  return response.data.wordDefinition;
}
