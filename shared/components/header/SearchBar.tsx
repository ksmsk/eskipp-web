import { getQuickSearch, getSearch } from "@shared/client/api";
import { IQuickSearch } from "@shared/data";
import { debounce } from "@shared/utils/helpers";
import Link from "next/link";
import React, { useState } from "react";
import slugify from "slugify";

type Props = {};

export const SearchBar: React.FC<Props> = () => {
  const [result, setResult] = useState<IQuickSearch>();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const searchHandler = debounce(async (keyword: string) => {
    setKeyword(keyword);
    if (keyword.length > 0) {
      const data = await getQuickSearch(keyword);
      setOpen(true);
      setResult(data);
    }
  }, 250);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await getSearch(keyword);
    console.log(result);
  };

  return (
    <div className="relative">
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed inset-0 w-full bg-black opacity-40"
        />
      )}
      <form
        className="flex mx-4 overflow-hidden rounded-sm"
        onSubmit={handleSubmit}
      >
        <input
          name="keyword"
          className="relative w-full p-1 bg-gray-100 text-md"
          type="text"
          defaultValue={keyword}
          onChange={(e) => searchHandler(e.currentTarget.value)}
          onFocus={() => result && setOpen(true)}
        />
        <button
          type="submit"
          className="relative flex-shrink-0 px-2 text-gray-100 bg-yellow-500"
        >
          <svg className="h-4 fill-current " viewBox="0 0 512 512">
            <path d="M507 507c-2 3-6 5-10 5s-8-2-11-5L343 365c-74 63-182 66-259 7C6 313-20 208 21 120S159-16 254 5s162 106 162 203c0 50-18 98-51 135l142 143c6 6 6 15 0 21zM384 208c0-97-79-176-176-176S32 111 32 208s79 176 176 176 176-79 176-176z" />
          </svg>
        </button>
      </form>
      {open && result && (
        <div className="absolute bg-gray-800 border border-gray-600 inset-x-4">
          <ul>
            {result.Titles.map((x) => (
              <li
                className="px-2 py-1 text-sm text-gray-100"
                onClick={() => setOpen(false)}
              >
                <Link href={`/search/${x}`}>
                  <a>{x}</a>
                </Link>
              </li>
            ))}
            {result.Nicks.map((x) => (
              <li
                className="px-2 py-1 text-sm text-gray-100"
                onClick={() => setOpen(false)}
              >
                <Link href={`/author/${slugify(x)}`}>
                  <a>@{x}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
