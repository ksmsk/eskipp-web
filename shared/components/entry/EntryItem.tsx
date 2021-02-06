import { EntryTimeStamp } from "@shared/components/entry/EntryTimeStamp";
import { IEntry } from "@shared/data";
import { EntryParser } from "@shared/services/entryParser";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useRef } from "react";

type Props = {
  entry: IEntry;
};

export const EntryItem: React.FC<Props> = ({ entry }) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const content = new EntryParser(entry.Content);

  useLayoutEffect(() => {
    const eventHandler = (e: MouseEvent & { target: HTMLAnchorElement }) => {
      e.preventDefault();
      router.push(e.target.getAttribute("href"));
    };
    const links = contentRef.current.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", eventHandler);
    });
    return () => {
      links.forEach((link) => link.removeEventListener("click", eventHandler));
    };
  }, []);
  return (
    <div
      className="p-4 text-sm text-gray-100 whitespace-pre-wrap rounded-sm"
      key={entry.Id}
    >
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content.parse() }}
      />
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex text-gray-100">
          <svg className="h-3 mr-1 fill-current" viewBox="0 0 26 36">
            <path d="M12.93 36.19A13 13 0 010 23.26C0 16.21 13 0 13 0s13 16.21 13 23.26a12.89 12.89 0 01-13.07 12.93z" />
          </svg>
          {!!entry.FavoriteCount && entry.FavoriteCount}
        </div>
        <div className="flex flex-col items-end font-bold">
          <span className="text-yellow-500">{entry.Author.Nick}</span>
          <EntryTimeStamp created={entry.Created} updated={entry.LastUpdated} />
        </div>
      </div>
    </div>
  );
};
