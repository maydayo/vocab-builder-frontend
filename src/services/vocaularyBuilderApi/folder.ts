import { fetchClient } from "@/libs/fetchClient";
import { Folder } from "@/types/folder.type";

export async function getFolderList(): Promise<Folder[]> {
  const result = await fetchClient.get<Folder[]>("/folders");
  return result.data;
}
