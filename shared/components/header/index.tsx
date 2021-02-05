import Link from "next/link";
import React, { useState } from "react";
import titleResponse from "@mocks/titles.json";
import cx from "classnames";
import { SubMenu } from "@shared/components/header/SubMenu";

type Props = {};

export const Header: React.FC<Props> = () => {
  return (
    <div className="flex flex-col max-h-screen bg-gray-800 ">
      <div className="flex items-center justify-between flex-shrink-0 px-4 h-14">
        <div>
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
        <div className="flex mx-4 overflow-hidden rounded-sm">
          <input
            className="flex-grow-0 min-w-0 p-1 bg-gray-100 text-md"
            type="text"
          />
          <button className="flex-shrink-0 px-2 text-gray-100 bg-yellow-500">
            <svg className="h-4 fill-current " viewBox="0 0 512 512">
              <path d="M507 507c-2 3-6 5-10 5s-8-2-11-5L343 365c-74 63-182 66-259 7C6 313-20 208 21 120S159-16 254 5s162 106 162 203c0 50-18 98-51 135l142 143c6 6 6 15 0 21zM384 208c0-97-79-176-176-176S32 111 32 208s79 176 176 176 176-79 176-176z" />
            </svg>
          </button>
        </div>
        <button>
          <svg className="h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
          </svg>
        </button>
      </div>
      <SubMenu />
    </div>
  );
};
