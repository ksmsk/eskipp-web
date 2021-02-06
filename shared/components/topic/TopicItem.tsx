import { SectionContext } from "@shared/components/header/SubMenu";
import Link from "next/link";
import React, { useContext } from "react";
import slugify from "slugify";
import { ITopic } from "@shared/data";
import { Section } from "@shared/client/enums";

type Props = {
  topic: ITopic;
  year?: number;
};

export const TopicItem: React.FC<Props> = ({ topic, year }) => {
  const { section, setSection } = useContext(SectionContext);
  let url = `/topic/${slugify(topic.Title)}--${topic.TopicId}?mode=${section}`;
  if (section === Section.past) {
    url += `&year=${year}`;
  }
  return (
    <li onClick={() => setSection(undefined)}>
      <Link href={url}>
        <a className="flex items-center justify-between px-4 py-2 text-sm">
          <span>{topic.Title}</span>
          <span className="ml-4">{topic.MatchedCount}</span>
        </a>
      </Link>
    </li>
  );
};
