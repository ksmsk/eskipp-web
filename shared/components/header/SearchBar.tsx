import { useService } from "@xstate/react";
import { getQuickSearch } from "@shared/client/api";
import { IQuickSearch } from "@shared/data";
import { topicService } from "@shared/states/topic.machine";
import { debounce } from "@shared/utils/helpers";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import slugify from "slugify";
import { Section } from "@shared/client/enums";
type Props = {};

export const SearchBar: React.FC<Props> = () => {
  const [, send] = useService(topicService);
  const [result, setResult] = useState<IQuickSearch>();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const searchHandler = useCallback(
    debounce(async (keyword: string, submitted: boolean) => {
      if (!submitted && keyword.length > 0) {
        const data = await getQuickSearch(keyword);
        setOpen(true);
        setResult(data);
      }
    }, 500),
    []
  );

  useEffect(() => {
    searchHandler(keyword, submitted);
  }, [keyword, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.length > 0) {
      setOpen(false);
      setResult(undefined);
      setSubmitted(true);

      send({
        type: "TOGGLE",
        payload: {
          keyword,
          section: Section.search,
        },
      });
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {open && (
        <button
          onClick={() => {
            setOpen(false);
            setResult(undefined);
          }}
          className="fixed inset-0 w-full bg-black opacity-40"
        />
      )}
      <form
        className="flex justify-center mx-4 overflow-hidden rounded-sm"
        onSubmit={handleSubmit}
      >
        <input
          name="keyword"
          placeholder="başlık, #entry, @yazar"
          className="relative w-full max-w-md p-1 bg-gray-100 text-md"
          type="text"
          value={keyword}
          onChange={(e) => {
            setSubmitted(false);
            setKeyword(e.currentTarget.value);
          }}
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
        <div className="absolute z-10 bg-gray-800 border border-gray-600 inset-x-4">
          <ul>
            {result.Titles.map((title) => (
              <li key={title} onClick={() => setOpen(false)}>
                <Link href={`/search/${title}`}>
                  <a className="flex px-2 py-2 text-sm text-gray-100 hover:bg-gray-600">
                    {title}
                  </a>
                </Link>
              </li>
            ))}
            {result.Nicks.map((nick) => (
              <li key={nick} onClick={() => setOpen(false)}>
                <Link href={`/author/${slugify(nick)}`}>
                  <a className="flex px-2 py-2 text-sm text-gray-100 hover:bg-gray-600">
                    @{nick}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
