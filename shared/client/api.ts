import { ResultType, Section } from "@shared/client/enums";
import { http } from "@shared/services/http";
import { getObject } from "@shared/utils/localStorage";
import {
  ITopics,
  ITopicsResponse,
  ITopicEntries,
  ITopicEntriesResponse,
  IQueryResponse,
  IQuickSearchResponse,
} from "@shared/data";
import { format } from "fecha";
import slugify from "slugify";
import { currentYear } from "@shared/utils/helpers";

export const getTitles = async (
  section: Section,
  options?: { year?: number }
): Promise<ITopics | null> => {
  try {
    if (section === Section.popular) {
      const { data } = await http().post<ITopicsResponse>(
        "/api/index/popular",
        {
          Filters: getObject("filters"),
        }
      );
      return data.Data;
    }
    if (section === Section.past) {
      const { data } = await http().get<ITopicsResponse>(
        `/api/index/${section}/${options?.year}`
      );
      return data.Data;
    }
    const { data } = await http().get<ITopicsResponse>(`/api/index/${section}`);

    return data.Data;
  } catch {
    return null;
  }
};

type GetTitleEntriesOptions = {
  page?: number | string;
  topicId: number | string;
  section?: Section | string;
  day?: string;
  year?: string | number;
};

export const getTitleEntries = async ({
  topicId,
  page = 1,
  section,
  day,
  year = currentYear - 1,
}: GetTitleEntriesOptions): Promise<ITopicEntries | null> => {
  let url = `/api/topic/${topicId}`;

  if (section) {
    url += `/${section}`;
  }

  if (section === Section.today) {
    day = format(new Date(), "YYYY-MM-DD");
  }

  if (section === Section.past) {
    url += `/${year}`;
  }

  try {
    const { data } = await http().get<ITopicEntriesResponse>(url, {
      params: {
        p: page,
        day,
      },
    });
    return data.Data;
  } catch {
    return null;
  }
};

export const getHomePageTopic = async () => {
  try {
    const result = await getTitles(Section.popular);
    return await getTitleEntries({
      topicId: result.Topics[0].TopicId,
      section: Section.popular,
    });
  } catch {
    return null;
  }
};

export const getEntry = async (
  entryId: string | number
): Promise<ITopicEntries | null> => {
  try {
    const { data } = await http().get<ITopicEntriesResponse>(
      `/api/entry/${entryId}`
    );
    return data.Data;
  } catch {
    return null;
  }
};

export const getSearchQuery = async (keyword: string) => {
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

export const getQuickSearch = async (keyword: string) => {
  try {
    const { data } = await http().get<IQuickSearchResponse>(
      `/api/autocomplete/query/${keyword}`
    );
    return data.Data;
  } catch {
    return null;
  }
};
