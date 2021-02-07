import { DebeItem } from "@shared/components/topic/DebeItem";
import { TopicItem } from "@shared/components/topic/TopicItem";
import { TopicListPager } from "@shared/components/topic/TopicListPager";
import { ITopics } from "@shared/data";
import React from "react";

type Props = {
  result?: ITopics;
};

export const TopicList: React.FC<Props> = ({ result }) => {
  return (
    <div className="relative max-h-full overflow-y-scroll">
      <ul className="text-gray-100 divide-y divide-gray-700">
        <li className="sticky">
          <TopicListPager count={result.PageCount} cursor={result.PageIndex} />
        </li>
        {result?.Topics?.map((topic) => (
          <TopicItem topic={topic} key={topic.TopicId} />
        ))}
        {result?.DebeItems?.map((debe) => (
          <DebeItem debe={debe} key={debe.EntryId} />
        ))}
        <li className="sticky">
          <TopicListPager count={result.PageCount} cursor={result.PageIndex} />
        </li>
      </ul>
    </div>
  );
};
