import { login } from "@/services/vocaularyBuilderApi/login";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type UseLoginResult = {
  isError: boolean;
  isPending: boolean;
  errorMessage?: string;
  loginAsync: (input: LoginInput) => Promise<void>;
};

type LoginInput = {
  username: string;
  password: string;
};

export function useLogin(): UseLoginResult {
  const { isError, isPending, error, mutateAsync } = useMutation<
    void,
    AxiosError<string>,
    LoginInput
  >({
    mutationFn: login,
    mutationKey: ["login"],
  });
  return {
    isError,
    isPending,
    errorMessage: error?.response?.data,
    loginAsync: mutateAsync,
  };
}
