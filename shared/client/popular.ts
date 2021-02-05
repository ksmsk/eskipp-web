import { Section } from "@shared/client/enums";
import { http } from "@shared/services/http";
import { getObject } from "@shared/utils/localStorage";
import {
  ITopics,
  ITopicsResponse,
  ITopicEntries,
  ITopicEntriesResponse,
} from "@shared/data";
import { format } from "fecha";

export const getTitles = async (section: Section): Promise<ITopics | null> => {
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

    const { data } = await http().get<ITopicsResponse>(`/api/index/${section}`);

    return data.Data;
  } catch {
    return null;
  }
};

type GetEntriesOptions = {
  page?: number;
  topicId: number | string;
  section?: Section | string;
  day?: string;
};

export const getTitleEntries = async ({
  topicId,
  page = 1,
  section,
  day,
}: GetEntriesOptions): Promise<ITopicEntries | null> => {
  let url = `/api/topic/${topicId}`;

  if (section) {
    url += `/${section}`;
  }

  if (section === Section.today) {
    day = format(new Date(), "YYYY-MM-DD");
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
