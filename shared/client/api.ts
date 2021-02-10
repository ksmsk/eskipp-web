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
import { getSearchTopicEntries } from "@shared/client/entry";

export const getTitles = async (
  section: Section,
  options?: { year?: number; page?: number }
): Promise<ITopics | null> => {
  try {
    if (section === Section.popular) {
      const { data } = await http().post<ITopicsResponse>(
        "/api/index/popular",
        {
          Filters: getObject("filters"),
        },
        {
          params: {
            p: options?.page ?? 1,
          },
        }
      );
      return data.Data;
    }
    if (section === Section.past) {
      const { data } = await http().get<ITopicsResponse>(
        `/api/index/${section}/${options?.year}`,
        {
          params: {
            p: options?.page ?? 1,
          },
        }
      );
      return data.Data;
    }
    const { data } = await http().get<ITopicsResponse>(
      `/api/index/${section}`,
      {
        params: {
          p: options?.page ?? 1,
        },
      }
    );

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
  keyword?: string;
};

export const getTopicEntries = async ({
  topicId,
  page = 1,
  section,
  day,
  year = currentYear - 1,
  keyword = "http",
}: GetTitleEntriesOptions): Promise<ITopicEntries | null> => {
  if (section === Section.search) {
    return getSearchTopicEntries({ topicId, page, keyword });
  }
  let url = `/api/topic/${topicId}`;

  if (section && section !== Section.all) {
    url += `/${section}`;
  }

  if (!day && section === Section.today) {
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
    return await getTopicEntries({
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

export const getSearch = async (keyword: string) => {
  const modded = keyword
    .split(" ")
    .map((k) => k + "*")
    .join(" ");

  try {
    const { data } = await http().post<ITopicsResponse>(`/api/index/search`, {
      Keywords: modded,
      WhenFrom: "",
      Author: "",
      SortOrder: 1,
      WhenTo: "",
    });
    return data.Data;
  } catch {
    return null;
  }
};
