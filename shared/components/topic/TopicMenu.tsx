import { TopicPager } from "@shared/components/topic/TopicPager";
import { ITopicEntries } from "@shared/data";
import React from "react";

type Props = {
  result: ITopicEntries;
};

export const TopicMenu: React.FC<Props> = ({ result }) => {
  return (
    <div className="px-4">
      <TopicPager result={result} />
    </div>
  );
};
