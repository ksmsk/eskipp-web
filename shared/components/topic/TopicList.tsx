import { Loader } from "@shared/components/common/Loader";
import { DebeItem } from "@shared/components/topic/DebeItem";
import { TopicItem } from "@shared/components/topic/TopicItem";
import { IDebe, ITopic } from "@shared/data";
import React from "react";

type Props = {
  topics?: ITopic[];
  debes?: IDebe[];
  year?: number;
  busy: boolean;
};

export const TopicList: React.FC<Props> = ({ topics, debes, year, busy }) => {
  return busy ? (
    <Loader />
  ) : (
    <ul className="text-gray-100 divide-y divide-gray-700">
      {topics?.map((topic) => (
        <TopicItem topic={topic} year={year} key={topic.TopicId} />
      ))}
      {debes?.map((debe) => (
        <DebeItem debe={debe} key={debe.EntryId} />
      ))}
    </ul>
  );
};
