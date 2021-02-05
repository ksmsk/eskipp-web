import { TimeStamp } from "@shared/components/TimeStamp";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTitleEntries } from "@shared/client/popular";
import { Loader } from "@shared/components/common/Loader";
import { ITopicEntries } from "@shared/data";

type Props = {};

export const TopicPage: NextPage<Props> = () => {
  const {
    query: { slug, mode },
  } = useRouter();

  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<ITopicEntries>();

  useEffect(() => {
    if (slug) {
      setBusy(true);
      getTitleEntries({
        topicId: (slug as string).split("--")[1],
        section: mode as string,
      }).then((data) => {
        setResult(data);
        setBusy(false);
      });
    }
  }, [slug, mode]);

  return busy ? (
    <Loader />
  ) : (
    <>
      <h1 className="m-4 text-xl font-bold text-gray-100">{result.Title}</h1>
      <div className="divide-y divide-gray-600">
        {result.Entries.map((entry) => (
          <div
            className="p-4 text-sm text-gray-100 whitespace-pre-wrap rounded-sm"
            key={entry.Id}
          >
            <div>{entry.Content}</div>
            <div className="flex flex-col items-end mt-4 text-xs font-bold">
              <span>{entry.Author.Nick}</span>
              <TimeStamp created={entry.Created} updated={entry.LastUpdated} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopicPage;
