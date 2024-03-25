import { fetchClient } from "@/libs/fetchClient";
import { Folder } from "@/types/folder.type";

export async function getFolderList(): Promise<Folder[]> {
  const result = await fetchClient.get<Folder[]>("/folders");
  return result.data;
}

export async function getFolder(folderId: string): Promise<Folder> {
  const result = await fetchClient.get<Folder>(`/folders/${folderId}`);
  return result.data;
}

export async function addFolder({
  folderName,
}: {
  folderName: string;
}): Promise<void> {
  await fetchClient.post<Folder>(`/folders`, { folderName });
}
