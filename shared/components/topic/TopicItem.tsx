import { useService } from "@xstate/react";
import Link from "next/link";
import React, { useMemo } from "react";
import slugify from "slugify";
import { IDebe, ITopic } from "@shared/data";
import { Section } from "@shared/client/enums";
import { topicService } from "@shared/states/topic.machine";
import cx from "classnames";
import { useRouter } from "next/router";
import { format } from "fecha";

type Props = {
  topic?: ITopic;
  debe?: IDebe;
};

export const TopicItem: React.FC<Props> = ({ topic, debe }) => {
  const router = useRouter();
  const [state, send] = useService(topicService);

  let url = "";
  if (topic) {
    url = `/topic/${slugify(topic.Title)}--${topic.TopicId}`;

    if (state.context.section.startsWith("channel")) {
      url += `?mode=${Section.today}`;
    } else if (state.context.section !== Section.search) {
      url += `?mode=${state.context.section}`;
    }

    if (state.context.section === Section.past) {
      url += `&year=${state.context.year}`;
    }
    if (topic.Day) {
      url += `&day=${format(new Date(topic.Day), "YYYY-MM-DD")}`;
    }
  } else {
    url = `/entry/${debe.EntryId}`;
  }

  const isActive = useMemo(() => {
    try {
      const isTopic = !!router.query.slug;
      const hasDay = !!topic?.Day;

      let active = router.query.id === `${debe?.EntryId}`;

      if (isTopic) {
        const topicSlug = (router.query.slug as string).split("--")[0];
        active = topicSlug === slugify(topic.Title);
        if (hasDay && router.query.day) {
          active =
            active &&
            format(new Date(topic.Day), "YYYY-MM-DD") === router.query.day;
        }
      }

      return active;
    } catch {
      return false;
    }
  }, [
    router.query.id,
    router.query.slug,
    debe?.EntryId,
    topic?.Title,
    router.query.day,
  ]);

  return (
    <li onClick={() => send("CLOSE")}>
      <Link href={url}>
        <a
          className={cx(
            "flex items-center justify-between px-2 py-2 text-sm lg:text-base hover:bg-gray-600",
            {
              "bg-yellow-500": isActive,
            }
          )}
        >
          <span>{topic?.Title || debe.Title}</span>
          {!!topic && <span className="ml-4">{topic.MatchedCount}</span>}
        </a>
      </Link>
    </li>
  );
};
