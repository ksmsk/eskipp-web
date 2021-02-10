import { IEntryCounts } from "@shared/data";
import { IEntry, ITopicEntries } from "@shared/data/topicEntries";

export interface IAuthorResponse {
  Success: boolean;
  Message: null;
  Data: IAuthor;
}

export interface IAuthor {
  UserInfo: IUserInfo;
  Badges: IBadge[];
  HasEntryUsedOnSeyler: boolean;
  FollowerCount: number;
  FollowingsCount: number;
  Picture?: string;
  PinnedEntry?: ITopicEntries;
}

export interface IBadge {
  Name: string;
  Description: string;
}

export interface IUserInfo {
  UserIdentifier: IUserIdentifier;
  RemainingInvitation: number;
  TwitterScreenName?: string;
  FacebookProfileUrl?: string;
  FacebookScreenName?: string;
  InstagramScreenName?: string;
  InstagramProfileUrl?: string;
  Karma?: IKarma;
  EntryCounts: IEntryCounts;
  LastEntryDate?: string;
  StandingQueueNumber: number;
  HasAnyPendingInvitation: boolean;
  IsBuddy: boolean;
  IsBlocked: boolean;
  IsFollowed: boolean;
  IsCorporate: boolean;
  IsDeactivated: boolean;
  IsKarmaShown: boolean;
  IsCaylak: boolean;
  IsIndexTitlesBlocked: boolean;
  Note: null;
  CursePeriod: null;
  IsCursed: boolean;
  IsBanned: boolean;
  DisplayTwitterProfile: boolean;
  DisplayFacebookProfile: boolean;
  DisplayInstagramProfile: boolean;
}

export interface IUserIdentifier {
  Nick: string;
  Id: number;
}

export interface IKarma {
  Name: string;
  Value: number;
}

export interface IAuthorEntriesResponse {
  Success: boolean;
  Message: null;
  Data: IAuthorEntries;
}

export interface IAuthorEntries {
  PinnedEntry?: ITopicEntries;
  Entries: IAuthorEntryContent[];
  PageCount: number;
  PageSize: number;
  PageIndex: number;
}

export interface IAuthorEntryContent {
  TopicId: IAuthorEntryTopic;
  Entry: IEntry;
}

export interface IAuthorEntryTopic {
  Id: number;
  TopicTitle: IAuthorEntryTopicTitle;
  Title: string;
}

export interface IAuthorEntryTopicTitle {
  Title: string;
  Kind: null | string;
}
