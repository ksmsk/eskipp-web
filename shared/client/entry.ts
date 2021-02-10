import { Section } from "@shared/client/enums";
import { ITopicEntries, ITopicEntriesResponse } from "@shared/data";
import { http } from "@shared/services/http";
import { currentYear } from "@shared/utils/helpers";
import axios from "axios";
import { format } from "fecha";

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
    return getTopicEntriesBySearch({ topicId, page, keyword });
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

export const getSingleEntry = async (
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

type GetSearchTopicEntriesOptions = {
  topicId: string | number;
  keyword: string;
  page?: number | string;
};

export const getTopicEntriesBySearch = async (
  params: GetSearchTopicEntriesOptions
) => {
  try {
    const response = await axios.get<ITopicEntriesResponse>("/api/search", {
      params,
    });
    return response.data.Data;
  } catch {
    return null;
  }
};
