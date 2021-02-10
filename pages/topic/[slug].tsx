import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getTopicEntries } from "@shared/client/api";
import { ITopicEntries } from "@shared/data";
import { TopicContent } from "@shared/components/topic/TopicContent";
import { WithRouterProps } from "next/dist/client/with-router";
import { Section } from "@shared/client/enums";

type Props = {} & WithRouterProps;

export const TopicPage: NextPage<Props> = ({ router: { query } }) => {
  const [fallback, setFallback] = useState<Section>(Section.all);
  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    setFallback((query.mode as Section) ?? Section.all);
  }, [query.slug]);

  useEffect(() => {
    if (query.slug) {
      setBusy(true);
      getTopicEntries({
        ...query,
        section: query.mode as Section,
        topicId: (query.slug as string).split("--")[1],
      }).then((data) => {
        setResult(data);
        setBusy(false);
      });
    }
  }, [query]);

  return <TopicContent busy={busy} result={result} fallback={fallback} />;
};

export default withRouter(TopicPage);
