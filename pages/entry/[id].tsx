import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getEntry } from "@shared/client/api";
import { ITopicEntries } from "@shared/data";
import { TopicContent } from "@shared/components/topic/TopicContent";
import { WithRouterProps } from "next/dist/client/with-router";

type Props = {} & WithRouterProps;

export const TopicPage: NextPage<Props> = ({ router }) => {
  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    setBusy(true);
    getEntry(router.query.id as string).then((data) => {
      setResult(data);
      setBusy(false);
    });
  }, [router.query.id]);

  return <TopicContent busy={busy} result={result} />;
};

export default withRouter(TopicPage);
