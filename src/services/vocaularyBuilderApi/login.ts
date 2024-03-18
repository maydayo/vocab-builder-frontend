import { fetchClient } from "@/libs/fetchClient";

type LoginInput = {
  username: string;
  password: string;
};

export async function login(input: LoginInput) {
  await fetchClient.post<void>("/login", input);
}
