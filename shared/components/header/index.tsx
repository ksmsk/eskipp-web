import { useService } from "@xstate/react";
import Link from "next/link";
import React from "react";
import { SubMenu } from "@shared/components/header/SubMenu";
import { SearchBar } from "@shared/components/header/SearchBar";
import { topicService } from "@shared/states/topic.machine";
type Props = {};

export const Header: React.FC<Props> = () => {
  const [, send] = useService(topicService);
  return (
    <div className="bg-gray-800 ">
      <div className="flex items-center justify-between row-auto m-4">
        <div onClick={() => send("CLOSE")}>
          <Link href="/">
            <a>
              <svg
                className="h-6 text-yellow-500 fill-current"
                viewBox="0 0 26 36"
              >
                <path d="M12.93 36.19A13 13 0 010 23.26C0 16.21 13 0 13 0s13 16.21 13 23.26a12.89 12.89 0 01-13.07 12.93z" />
              </svg>
            </a>
          </Link>
        </div>
        <SearchBar />
        <a
          href="https://eksisozluk.com"
          className="hidden text-xs text-yellow-500 md:inline hover:underline"
          target="_blank"
        >
          eski dandik site
          <svg
            className="inline h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <button disabled className="text-transparent md:hidden">
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
        </button>
        {/* <a
          href="https://eksisozluk.com"
          className="block w-6 h-6 text-yellow-500 md:hidden"
        >
          <svg className="stroke-current" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a> */}
      </div>
      <SubMenu />
    </div>
  );
};
