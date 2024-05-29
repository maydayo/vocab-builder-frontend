type UseCheckSentenceReturnType = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  result?: string;
  checkSentence: (params: { word: string; sentence: string }) => void;
};

export function useCheckSentence(): UseCheckSentenceReturnType {
  return {
    isPending: false,
    isError: false,
    errorMessage: "false",
    result: undefined,
    checkSentence: (params: { word: string; sentence: string }) => {},
  };
}
