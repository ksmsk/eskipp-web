import { Loader } from "@shared/components/common/Loader";
import { EntryItem } from "@shared/components/entry/EntryItem";
import { ITopicEntries } from "@shared/data";
import Link from "next/link";
import React from "react";
import slugify from "slugify";
import Head from "next/head";
import { TopicMenu } from "@shared/components/topic/TopicMenu";

type Props = {
  busy: boolean;
  result: ITopicEntries;
};

export const TopicContent: React.FC<Props> = ({ busy, result }) => {
  return busy ? (
    <Loader />
  ) : result ? (
    <>
      <Head>
        <title>{result.Title} | eksipp</title>
      </Head>
      <Link href={`/topic/${slugify(result.Title)}--${result.Id}`}>
        <a className="flex m-4 text-xl font-bold text-yellow-500">
          {result.Title}
        </a>
      </Link>
      <TopicMenu result={result} />
      <div className="divide-y divide-gray-600">
        {result.Entries.map((entry) => (
          <EntryItem entry={entry} key={entry.Id} />
        ))}
      </div>
    </>
  ) : (
    <p>Icerik bulunamadi</p>
  );
};
