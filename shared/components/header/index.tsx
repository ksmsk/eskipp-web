import Link from "next/link";
import React from "react";
import { SubMenu } from "@shared/components/header/SubMenu";
import { SearchBar } from "@shared/components/header/SearchBar";

type Props = {};

export const Header: React.FC<Props> = () => {
  return (
    <div className="flex flex-col max-h-screen bg-gray-800">
      <div className="flex items-center justify-between m-4">
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
        <SearchBar />
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
