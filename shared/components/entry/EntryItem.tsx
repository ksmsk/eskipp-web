import { EntryTimeStamp } from "@shared/components/entry/EntryTimeStamp";
import { IEntry } from "@shared/data";
import { EntryParser } from "@shared/services/entryParser";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useRef } from "react";
import cx from "classnames";
import slugify from "slugify";

type Props = {
  entry: IEntry;
  title?: string;
  pinned?: boolean;
};

export const EntryItem: React.FC<Props> = ({ entry, title, pinned }) => {
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
      className={cx(
        "p-4 text-sm text-gray-100 whitespace-pre-wrap  rounded-md shadow-md lg:text-base",
        {
          "bg-gray-800": pinned,
          "bg-gray-600": !pinned,
        }
      )}
      key={entry.Id}
    >
      {pinned && (
        <div className="flex items-center mb-4 text-xs">
          <svg
            className="w-3 h-3 text-yellow-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.493 489.493"
          >
            <path d="M485.322 117.705c12.204-12.238-3.274-47.577-34.636-78.93-30.99-30.99-65.76-46.396-78.401-34.941l-.246-.236-173.715 156.02c-32.117-27.993-80.684-27.038-111.278 3.534a27.516 27.516 0 00-8.051 19.437 27.48 27.48 0 008.051 19.431l78.808 78.801L3.902 463.627c-5.148 5.799-5.262 14.655.015 20.601 5.689 6.403 15.497 6.992 21.916 1.294l182.575-162.137 7.84 7.829 40.601 40.603 30.336 30.329a27.48 27.48 0 0019.424 8.039 27.446 27.446 0 0019.419-8.056c30.561-30.573 31.524-79.158 3.539-111.27L484.771 118.03c.156-.138.406-.169.551-.325z" />
          </svg>
          <p className="ml-1 italic text-gray-400">sabitlenmiş entry</p>
        </div>
      )}
      {title && (
        <Link href={`/search/${title}`}>
          <a className="block mb-4 text-lg font-bold text-yellow-500">
            {title}
          </a>
        </Link>
      )}
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
          <Link href={`/author/${slugify(entry.Author.Nick)}`}>
            <a className="text-yellow-500 hover:underline">
              {entry.Author.Nick}
            </a>
          </Link>
          <Link href={`/entry/${entry.Id}`}>
            <a className="hover:underline">
              <EntryTimeStamp
                created={entry.Created}
                updated={entry.LastUpdated}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
