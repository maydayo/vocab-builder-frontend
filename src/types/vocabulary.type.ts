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
  readingStatus: "learned" | "learning";
  createdAt: Date;
  lastLearnedAt: Date | null;
  matchedWordList: string[];
};
