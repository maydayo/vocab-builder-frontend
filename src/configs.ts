type Configs = {
  baseUrl: string;
};

export const configs: Configs = {
  baseUrl: process.env.NEXT_PUBLIC_VOCABULARY_API_BASE_URL as string,
};
