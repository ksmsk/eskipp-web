import { Loader } from "@shared/components/common/Loader";
import { TopicItem } from "@shared/components/topic/TopicItem";
import { ITopic } from "@shared/data";
import React from "react";

type Props = {
  topics?: ITopic[];
  busy: boolean;
};

export const TopicList: React.FC<Props> = ({ topics, busy }) => {
  return busy ? (
    <Loader />
  ) : (
    <ul className="text-gray-100 divide-y divide-gray-700">
      {topics?.map((topic) => (
        <TopicItem topic={topic} key={topic.TopicId} />
      ))}
    </ul>
  );
};
