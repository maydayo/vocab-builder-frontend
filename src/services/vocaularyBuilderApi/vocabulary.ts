import { fetchClient } from "@/libs/fetchClient";
import { Vocabulary, WordDefinition } from "@/types/vocabulary.type";

export type GetVocabularyResponse = {
  vocabularyList: Vocabulary[];
};

export async function getVocabularyList(): Promise<Vocabulary[]> {
  const response = await fetchClient.get<GetVocabularyResponse>(
    `/vocabularies/`
  );
  return response.data.vocabularyList;
}

export type AddVocabularyResponse = {
  wordDefinition: WordDefinition;
};
export async function addVocabulary(word: string): Promise<WordDefinition> {
  const response = await fetchClient.put<AddVocabularyResponse>(
    `/vocabularies/${word}`
  );
  return response.data.wordDefinition;
}
