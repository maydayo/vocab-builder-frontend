import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/vocaularyBuilderApi/me";

type UseMeResult = {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export function useMe(): UseMeResult {
  const { isError, isPending, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
  return {
    isPending,
    isError,
    isSuccess,
  };
}
