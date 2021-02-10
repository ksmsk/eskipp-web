import { IAuthorEntriesResponse, IAuthorResponse } from "@shared/data";
import { http } from "@shared/services/http";

export enum AuthorEntryType {
  entry = "entries",
  favorited = "favorited",
}

export const getAuthor = async (nick: string) => {
  try {
    const { data } = await http().get<IAuthorResponse>(`/api/user/${nick}`);
    return data.Data;
  } catch {
    return null;
  }
};

export const getAuthorEntries = async (
  nick: string,
  type: AuthorEntryType = AuthorEntryType.entry,
  page: number = 1
) => {
  try {
    const { data } = await http().get<IAuthorEntriesResponse>(
      `/api/user/${nick}/${type}`,
      { params: { p: page } }
    );
    return data.Data;
  } catch {
    return null;
  }
};
