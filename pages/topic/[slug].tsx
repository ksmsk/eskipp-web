import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTitleEntries } from "@shared/client/api";
import { ITopicEntries } from "@shared/data";
import { TopicContent } from "@shared/components/topic/TopicContent";

type Props = {};

export const TopicPage: NextPage<Props> = () => {
  const {
    query: { slug, mode, page, year },
  } = useRouter();

  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    if (slug) {
      setBusy(true);
      getTitleEntries({
        topicId: (slug as string).split("--")[1],
        section: mode as string,
        page: page as string,
        year: year as string,
      }).then((data) => {
        setResult(data);
        setBusy(false);
      });
    }
  }, [slug, mode, page]);

  return <TopicContent busy={busy} result={result} />;
};

export default TopicPage;
