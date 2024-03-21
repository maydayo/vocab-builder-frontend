import { fetchClient } from "@/libs/fetchClient";

export async function getMe(): Promise<void> {
  fetchClient.get("/users/me");
}
