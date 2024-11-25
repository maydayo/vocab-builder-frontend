import { fetchClient } from "@/libs/fetchClient";
import {
  LearningStatus,
  Vocabulary,
  WordDefinition,
} from "@/types/vocabulary.type";

export type GetVocabularyListResponse = {
  vocabularyList: Vocabulary[];
};

export async function getVocabularyList(
  folderId: string
): Promise<Vocabulary[]> {
  const response = await fetchClient.get<GetVocabularyListResponse>(
    `/vocabularies?folderId=${folderId}`
  );
  return response.data.vocabularyList;
}

type GetRandomVocabularyResponse = Vocabulary;
export async function getRandomVocabulary(params: {
  folderId: string;
}): Promise<Vocabulary> {
  const response = await fetchClient.get<GetRandomVocabularyResponse>(
    `/vocabularies/random?folderId=${params.folderId}`
  );
  return response.data;
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

export async function updateLearningStatus(args: {
  vocabularyId: string;
  learningStatus: LearningStatus;
}): Promise<void> {
  const { vocabularyId, learningStatus } = args;
  await fetchClient.post<AddVocabularyResponse>(
    `/vocabularies/${vocabularyId}/edit-learning-status`,
    { learningStatus }
  );
}

export type GetRandomVocabularyListArgs = {
  folderId: string;
};
export type GetRandomVocabularyListResponse = {
  vocabularyList: Vocabulary[];
};
export type GetRandomVocabularyListReturnType = {
  vocabularyList: Vocabulary[];
  wordList: string[];
};
export async function getRandomVocabularyList(
  args: GetRandomVocabularyListArgs
): Promise<GetRandomVocabularyListReturnType> {
  const { folderId } = args;
  const response = await fetchClient.get<GetRandomVocabularyListResponse>(
    `/vocabularies/random-list?folderId=${folderId}`
  );
  const wordList = response.data.vocabularyList.map(
    (vocabulary) => vocabulary.word
  );
  return {
    vocabularyList: response.data.vocabularyList,
    wordList,
  };
}
