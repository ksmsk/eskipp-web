import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getEntry } from "@shared/client/api";
import { ITopicEntries } from "@shared/data";
import { TopicContent } from "@shared/components/topic/TopicContent";

type Props = {};

export const TopicPage: NextPage<Props> = () => {
  const {
    query: { id },
  } = useRouter();

  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    if (id) {
      setBusy(true);
      getEntry(id as string).then((data) => {
        setResult(data);
        setBusy(false);
      });
    }
  }, [id]);

  return <TopicContent busy={busy} result={result} />;
};

export default TopicPage;
