import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getHomePageTopic } from "@shared/client/api";
import { ITopicEntries } from "@shared/data";
import { TopicContent } from "@shared/components/topic/TopicContent";

type Props = {};

export const HomePage: NextPage<Props> = () => {
  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    setBusy(true);
    getHomePageTopic().then((data) => {
      setResult(data);
      setBusy(false);
    });
  }, []);

  return <TopicContent busy={busy} result={result} />;
};

export default HomePage;
