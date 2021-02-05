export interface ITopicEntriesResponse {
  Success: boolean;
  Message: null;
  Data: ITopicEntries;
}

export interface ITopicEntries {
  Id: number;
  Title: string;
  Entries: IEntry[];
  PageCount: number;
  PageSize: number;
  PageIndex: number;
  PinnedEntry: null;
  EntryCounts: IEntryCounts;
  DraftEntry: null;
  IsTracked: boolean;
  IsTrackable: boolean;
  Slug: string;
  Video: IVideo;
  Disambiguations: any[];
  IsAmaTopic: boolean;
  MatterCount: number;
}

export interface IEntry {
  Id: number;
  Content: string;
  Author: IEntryAuthor;
  Created: string;
  LastUpdated: string | null;
  IsFavorite: boolean;
  FavoriteCount: number;
  Hidden: boolean;
  Active: boolean;
  CommentCount: number;
  CommentSummary: null;
  AvatarUrl: null | string;
}

export interface IEntryAuthor {
  Nick: string;
  Id: number;
}

export interface IEntryCounts {
  BeforeFirstEntry: number;
  AfterLastEntry: number;
  Buddy: number;
  Total: number;
}

export interface IVideo {
  DisplayInfo: null;
  InTopicVideo: boolean;
}
