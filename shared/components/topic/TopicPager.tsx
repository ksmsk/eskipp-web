import { Section } from "@shared/client/enums";
import { ITopicEntries } from "@shared/data";
import { useRouter } from "next/router";
import React from "react";
import slugify from "slugify";

type Props = {
  result: ITopicEntries;
};

export const TopicPager: React.FC<Props> = ({ result }) => {
  const { query, push, pathname } = useRouter();

  const fetcher = (page: number | string = 1) => {
    const newQuery: any = {
      slug: query.slug ?? `${slugify(result.Title)}--${result.Id}`,
      page,
    };

    if (pathname === "/") {
      newQuery.mode = Section.popular;
    }

    if (query.mode) {
      newQuery.mode = query.mode;
    }
    if (query.year) {
      newQuery.year = query.year;
    }

    push({
      pathname: "/topic/[slug]",
      query: newQuery,
    });
  };

  return result.PageCount > 1 ? (
    <div className="flex items-center justify-end text-gray-100">
      <button
        disabled={result.PageIndex <= 1}
        className="px-2 mr-2 bg-gray-800 rounded-sm"
        style={{ visibility: result.PageIndex <= 1 ? "hidden" : "visible" }}
        onClick={() => fetcher(result.PageIndex - 1)}
      >
        {"<"}
      </button>
      <select
        className="p-1 bg-gray-800 rounded-sm"
        value={result.PageIndex}
        onChange={(e) => fetcher(e.currentTarget.value)}
      >
        {Array(result.PageCount)
          .fill(0)
          .map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
      </select>
      <span className="mx-2">/</span>
      <button
        className="px-2 bg-gray-500 rounded-sm"
        onClick={() => fetcher(result.PageCount)}
      >
        {result.PageCount}
      </button>
      <button
        disabled={result.PageIndex >= result.PageCount}
        className="px-2 ml-2 bg-gray-800 rounded-sm"
        style={{
          visibility:
            result.PageIndex >= result.PageCount ? "hidden" : "visible",
        }}
        onClick={() => fetcher(result.PageIndex + 1)}
      >
        {">"}
      </button>
    </div>
  ) : null;
};
