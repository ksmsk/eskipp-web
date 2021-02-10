import { TopicItem } from "@shared/components/topic/TopicItem";
import { TopicListPager } from "@shared/components/topic/TopicListPager";
import { ITopics } from "@shared/data";
import React from "react";

type Props = {
  result?: ITopics;
};

export const TopicList: React.FC<Props> = ({ result }) => {
  return (
    <ul className="w-full h-full px-2 overflow-y-scroll text-gray-100 divide-y divide-gray-700 scrollbar">
      <li className="sticky">
        <TopicListPager count={result.PageCount} cursor={result.PageIndex} />
      </li>
      {result?.Topics?.map((topic) => (
        <TopicItem topic={topic} key={topic.TopicId + "" + topic.Day} />
      ))}
      {result?.DebeItems?.map((debe) => (
        <TopicItem debe={debe} key={debe.EntryId} />
      ))}
      <li className="sticky">
        <TopicListPager count={result.PageCount} cursor={result.PageIndex} />
      </li>
    </ul>
  );
};
