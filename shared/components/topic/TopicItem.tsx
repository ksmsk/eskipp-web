import { SectionContext } from "@shared/components/header/SubMenu";
import Link from "next/link";
import React, { useContext } from "react";
import slugify from "slugify";
import { ITopic } from "@shared/data";

type Props = {
  topic: ITopic;
};

export const TopicItem: React.FC<Props> = ({ topic }) => {
  const { section, setSection } = useContext(SectionContext);

  return (
    <li onClick={() => setSection(undefined)}>
      <Link
        href={`/topic/${slugify(topic.Title)}--${
          topic.TopicId
        }?mode=${section}`}
      >
        <a className="flex items-center justify-between px-4 py-2 text-sm">
          <span>{topic.Title}</span>
          <span className="ml-4">{topic.MatchedCount}</span>
        </a>
      </Link>
    </li>
  );
};
