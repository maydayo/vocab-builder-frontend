import { fetchClient } from "@/libs/fetchClient";

type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(input: LoginInput): Promise<string> {
  const response = await fetchClient.post<LoginResponse>("/login", input);
  return response.data.token;
}
