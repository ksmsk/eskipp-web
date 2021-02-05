import { NextPage } from "next";
import React from "react";
import titleEntriesResponse from "@mocks/titleEntries.json";
import { TimeStamp } from "@shared/components/TimeStamp";

type Props = {};

const HomePage: NextPage<Props> = () => {
  return (
    <>
      <h1 className="m-4 text-xl font-bold text-gray-100">
        {titleEntriesResponse.Data.Title}
      </h1>
      <div className="divide-y divide-gray-600">
        {titleEntriesResponse.Data.Entries.map((entry) => (
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

export default HomePage;
