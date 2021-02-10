import { Loader } from "@shared/components/common/Loader";
import { IAuthor, IAuthorEntries } from "@shared/data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAuthorEntries } from "@shared/client/author";
import { EntryItem } from "@shared/components/entry/EntryItem";
import { TopicListPager } from "@shared/components/topic/TopicListPager";

type Props = {
  busy: boolean;
  result: IAuthor;
};

export const AuthorContent: React.FC<Props> = ({ busy, result }) => {
  const [entries, setEntries] = useState<IAuthorEntries>();
  const [entryBusy, setEntryBusy] = useState(false);
  useEffect(() => {
    if (result?.UserInfo.UserIdentifier.Nick) {
      getAuthorEntries(result?.UserInfo.UserIdentifier.Nick).then((data) => {
        setEntries(data);
        setEntryBusy(false);
      });
    }
  }, [result?.UserInfo.UserIdentifier.Nick]);
  return busy ? (
    <Loader />
  ) : result ? (
    <>
      <Head>
        <title>{result.UserInfo.UserIdentifier.Nick} | eksipp</title>
      </Head>
      <Link href={`/search/${result.UserInfo.UserIdentifier.Nick}`}>
        <a className="flex mb-4 text-lg font-bold text-yellow-500 md:text-xl lg:text-3xl">
          {result.UserInfo.UserIdentifier.Nick}
        </a>
      </Link>
      <div className="flex items-center mb-4 text-xs md:text-base">
        <div className="flex-shrink-0">
          {result.Picture ? (
            <img
              className="w-24 h-24 rounded-full md:w-32 md:h-32"
              src={result.Picture}
              alt={result.UserInfo.UserIdentifier.Nick}
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 text-4xl text-gray-100 bg-gray-600 rounded-full md:w-32 md:h-32">
              {result.UserInfo.UserIdentifier.Nick.slice(0, 2)}
            </div>
          )}
        </div>
        <div className="w-full ml-4">
          {result.Badges.length > 0 && (
            <div className="flex items-center space-x-1 md:space-x-2">
              {result.Badges.map((badge) => (
                <Link href={`/search/${badge.Name}`}>
                  <a className="px-2 py-1 mb-2 font-bold text-gray-100 bg-yellow-500 rounded-lg md:mb-4">
                    {badge.Name}
                  </a>
                </Link>
              ))}
            </div>
          )}
          {!!result.UserInfo.Karma && (
            <p className="mb-2 font-bold tracking-wide text-gray-100 md:mb-4">
              {result.UserInfo.Karma?.Name} ({result.UserInfo.Karma?.Value})
            </p>
          )}
          <div className="flex justify-between md:justify-start md:space-x-20">
            <div>
              <p className="font-bold text-gray-100">
                {result.UserInfo.EntryCounts.Total}
              </p>
              <p className="text-xs text-gray-400">Entry</p>
            </div>
            <div>
              <p className="font-bold text-gray-100">
                {result.FollowingsCount}
              </p>
              <p className="text-xs text-gray-400">Takibinde</p>
            </div>
            <div>
              <p className="font-bold text-gray-100">{result.FollowerCount}</p>
              <p className="text-xs text-gray-400">Takipçi</p>
            </div>
          </div>
        </div>
      </div>
      <div>entry menuler###</div>

      {entryBusy ? (
        <Loader />
      ) : (
        !!entries && (
          <div className="space-y-4">
            <TopicListPager
              count={entries.PageCount}
              cursor={entries.PageIndex}
            />
            {result.PinnedEntry && (
              <EntryItem
                pinned
                entry={result.PinnedEntry.Entries[0]}
                title={result.PinnedEntry.Title}
              />
            )}
            {entries.Entries.map((entryContent) => (
              <EntryItem
                entry={entryContent.Entry}
                title={entryContent.TopicId.Title}
                key={entryContent.Entry.Id}
              />
            ))}
          </div>
        )
      )}
    </>
  ) : (
    <p>icerik yok</p>
  );
};
