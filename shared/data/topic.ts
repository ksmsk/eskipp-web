export interface ITopicsResponse {
  Success: boolean;
  Message: null;
  Data: ITopics;
}

export interface ITopics {
  Topics?: ITopic[];
  DebeItems?: IDebe[];
  PageCount: number;
  PageSize: number;
  PageIndex: number;
}

export interface IDebe {
  EntryId: number;
  Title: string;
}

export interface ITopic {
  Day?: string;
  MatchedCount: number;
  TopicId: number;
  FullCount: number;
  Title: string;
}
