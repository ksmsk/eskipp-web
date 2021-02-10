import { ITopicEntriesResponse } from "@shared/data";
import axios from "axios";

type GetSearchTopicEntriesOptions = {
  topicId: string | number;
  keyword: string;
  page?: number | string;
};

export const getSearchTopicEntries = async (
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
