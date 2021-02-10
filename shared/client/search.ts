import { http } from "@shared/services/http";
import { IQueryResponse, IQuickSearchResponse } from "@shared/data";
import { ResultType } from "@shared/client/enums";
import slugify from "slugify";

export const getSearchQuick = async (keyword: string) => {
  try {
    const { data } = await http().get<IQuickSearchResponse>(
      `/api/autocomplete/query/${keyword}`
    );
    return data.Data;
  } catch {
    return null;
  }
};

export const getSearchTopic = async (keyword: string) => {
  try {
    const { data } = await http().get<IQueryResponse>("/api/topic/query/", {
      params: { term: keyword },
    });
    if (data.Data.Type === ResultType.title) {
      return `/topic/${slugify(keyword)}--${data.Data.QueryData.TopicId}`;
    } else {
      throw new Error();
    }
  } catch {
    return null;
  }
};
