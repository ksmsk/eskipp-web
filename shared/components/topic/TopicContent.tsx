import { Loader } from "@shared/components/common/Loader";
import { EntryItem } from "@shared/components/entry/EntryItem";
import { ITopicEntries } from "@shared/data";
import Link from "next/link";
import React from "react";
import slugify from "slugify";
import Head from "next/head";
import { TopicMenu } from "@shared/components/topic/TopicMenu";
import { Section } from "@shared/client/enums";

type Props = {
  busy: boolean;
  result: ITopicEntries;
  fallback: Section;
};

export const TopicContent: React.FC<Props> = ({ busy, result, fallback }) => {
  return busy ? (
    <Loader />
  ) : result ? (
    <>
      <Head>
        <title>{result.Title} | eksipp</title>
      </Head>
      <Link href={`/topic/${slugify(result.Title)}--${result.Id}`}>
        <a className="flex mb-4 text-lg font-bold text-yellow-500 md:text-xl lg:text-3xl">
          {result.Title}
        </a>
      </Link>
      <TopicMenu result={result} fallback={fallback} />
      <div>
        <div className="space-y-4 ">
          {result.Entries.map((entry) => (
            <EntryItem entry={entry} key={entry.Id} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <p>icerik yok</p>
  );
};
