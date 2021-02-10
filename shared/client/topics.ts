import { Section } from "@shared/client/enums";
import { ITopics, ITopicsResponse } from "@shared/data";
import { http } from "@shared/services/http";
import { currentYear } from "@shared/utils/helpers";
import { getObject } from "@shared/utils/localStorage";

export type GetTopicsOptions = {
  section: Section;
  year?: number;
  page?: number;
  keyword?: string;
};

export const getTopics = async ({
  section,
  year = currentYear - 1,
  page = 1,
  keyword,
}: GetTopicsOptions): Promise<ITopics> => {
  try {
    if (section === Section.search) {
      return await getTopicsBySearch(keyword, page);
    }
    if (section === Section.popular) {
      const { data } = await http().post<ITopicsResponse>(
        "/api/index/popular",
        {
          Filters: getObject("filters"),
        },
        {
          params: {
            p: page,
          },
        }
      );
      return data.Data;
    }

    let url = `/api/index/${section}`;

    if (section === Section.past) {
      url += `/${year}`;
    }

    const { data } = await http().get<ITopicsResponse>(url, {
      params: {
        p: page,
      },
    });

    return data.Data;
  } catch {
    return null;
  }
};

export const getTopicsBySearch = async (keyword: string, page: number = 1) => {
  const modded = keyword
    .split(" ")
    .map((k) => k + "*")
    .join(" ");

  try {
    const { data } = await http().post<ITopicsResponse>(
      `/api/index/search`,
      {
        Keywords: modded,
        WhenFrom: "",
        Author: "",
        SortOrder: 1,
        WhenTo: "",
      },
      { params: { p: page } }
    );
    return data.Data;
  } catch {
    return null;
  }
};
