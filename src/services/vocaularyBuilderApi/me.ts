import { fetchClient } from "@/libs/fetchClient";

export async function getMe(): Promise<void> {
  return fetchClient.get("/users/me");
}
