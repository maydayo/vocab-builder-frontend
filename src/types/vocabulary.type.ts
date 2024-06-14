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

export type LearningStatus = "learned" | "learning" | "idle";
export type Vocabulary = {
  id: string;
  userId: string;
  word: string;
  folderId: string;
  wordDefinition: WordDefinition;
  learningTimes: number;
  readingStatus: LearningStatus;
  usageStatus: LearningStatus;
  createdAt: Date;
  lastLearnedAt: Date | null;
  matchedWordList: string[];
};
