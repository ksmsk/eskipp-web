import { ResultType } from "@shared/client/enums";

export interface IQueryResponse {
  Success: boolean;
  Message?: string;
  Data: {
    Type: ResultType;
    QueryData: {
      TopicId: number;
    };
    RedirectedFrom: string;
  };
}

export interface IQuickSearchResponse {
  Success: boolean;
  Message: string | null;
  Data: IQuickSearch;
}

export interface IQuickSearch {
  Titles: string[];
  Query: string;
  Nicks: string[];
}
