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
  //TODO: remove this
  return {
    paragraph:
      "As the sun dipped below the horizon, casting a warm glow over the landscape, Sarah found herself lost in the serenity of the moment. The gentle rustle of leaves in the breeze provided a soothing soundtrack to her thoughts. She marveled at the way the colors of the sky transitioned from vibrant oranges and pinks to deep purples and blues. It was a scene of pure tranquility, a fleeting moment of peace amidst the chaos of everyday life. With a contented sigh, Sarah closed her eyes, allowing herself to be fully enveloped by the beauty of the world around her.",
    vocabularyList: [
      {
        id: "",
        userId: "",
        word: "horizon",
        folderId: "",
        wordDefinition: {
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition:
                    "the line at which the earth's surface and the sky appear to meet.",
                  synonyms: [],
                  antonyms: [],
                  example: "the sun rose above the horizon",
                },
              ],
            },
          ],
        },
        learningTimes: 0,
        status: "remembered",
        createdAt: new Date(),
        lastLearnedAt: null,
      },
    ],
  };
}
