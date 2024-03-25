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
export type AddVocabularyArgs = {
  folderId: string;
  word: string;
};

export async function addVocabulary(
  args: AddVocabularyArgs
): Promise<WordDefinition> {
  const { folderId, word } = args;
  const response = await fetchClient.put<AddVocabularyResponse>(
    `/vocabularies/${word}?folderId=${folderId}`
  );
  return response.data.wordDefinition;
}
