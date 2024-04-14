export type Meaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
  }[];
};
export type WordDefinition = {
  meanings: Meaning[];
};

export type Vocabulary = {
  id: string;
  userId: string;
  word: string;
  folderId: string;
  wordDefinition: WordDefinition;
  learningTimes: number;
  status: "learned" | "learning";
  createdAt: Date;
  lastLearnedAt: Date | null;
};
