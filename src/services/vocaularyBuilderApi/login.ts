import axios from "axios";

type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(input: LoginInput): Promise<string> {
  const response = await axios.post<LoginResponse>("/login", input);
  return response.data.token;
}
