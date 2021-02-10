import { Section } from "@shared/client/enums";
import { TopicPager } from "@shared/components/topic/TopicPager";
import { ITopicEntries } from "@shared/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import cx from "classnames";
import { sectionTr } from "@shared/utils/helpers";

type Props = {
  result: ITopicEntries;
  fallback: Section;
};

export const TopicMenu: React.FC<Props> = ({ result, fallback }) => {
  const router = useRouter();

  const isSingleEntry = useMemo(() => {
    return router.pathname === "/entry/[id]";
  }, [router.pathname]);

  const isActive = useCallback(
    (mode: Section) => {
      return (
        router.query.mode === mode ||
        (mode === Section.all && !router.query.mode)
      );
    },
    [router.query.mode]
  );

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as any);
    const keyword = formData.get("keyword");
    if (keyword) {
      router.push(
        `/topic/${router.query.slug}?mode=${
          Section.search
        }&keyword=${formData.get("keyword")}`
      );
    } else {
      router.push(`/topic/${router.query.slug}?mode=${Section.all}`);
    }
  };

  return (
    <div className="space-x-2 md:flex">
      <div className="flex flex-wrap md:mb-0">
        {isSingleEntry && (
          <Link href={`/search/${result.Title}`}>
            <a className="px-2 py-1 text-sm text-gray-100 bg-gray-500 rounded-sm">
              tümü
            </a>
          </Link>
        )}
        {!isSingleEntry && (
          <>
            {[Section.today, Section.popular, Section.past].includes(
              fallback
            ) && (
              <Link href={`/topic/${router.query.slug}?mode=${fallback}`}>
                <a
                  className={cx(
                    "text-sm px-2 py-1 text-gray-100 bg-gray-500 rounded-sm mb-4 mr-2",
                    {
                      "bg-yellow-500": isActive(fallback),
                    }
                  )}
                >
                  {sectionTr(fallback)}
                </a>
              </Link>
            )}
            <Link href={`/topic/${router.query.slug}?mode=${Section.allnice}`}>
              <a
                className={cx(
                  "text-sm px-2 py-1 text-gray-100 bg-gray-500 rounded-sm mb-4 mr-2",
                  {
                    "bg-yellow-500": isActive(Section.allnice),
                  }
                )}
              >
                şükela tümü
              </a>
            </Link>
            <Link
              href={`/topic/${router.query.slug}?mode=${Section.dailynice}`}
            >
              <a
                className={cx(
                  "text-sm px-2 py-1 text-gray-100 bg-gray-500 rounded-sm mb-4 mr-2",
                  {
                    "bg-yellow-500": isActive(Section.dailynice),
                  }
                )}
              >
                şükela bugün
              </a>
            </Link>
            <Link href={`/topic/${router.query.slug}?mode=${Section.search}`}>
              <a
                className={cx(
                  "text-sm px-2 py-1 text-gray-100 bg-gray-500 rounded-sm mb-4 mr-2",
                  {
                    "bg-yellow-500":
                      isActive(Section.search) && !router.query.keyword,
                  }
                )}
              >
                linkler
              </a>
            </Link>
            <Link href={`/topic/${router.query.slug}?mode=${Section.all}`}>
              <a
                className={cx(
                  "text-sm px-2 py-1 text-gray-100 bg-gray-500 rounded-sm mb-4 mr-2",
                  {
                    "bg-yellow-500": isActive(Section.all),
                  }
                )}
              >
                tümü
              </a>
            </Link>
            <form
              onSubmit={formHandler}
              className="flex mb-4 mr-2 overflow-hidden rounded-sm"
            >
              <input
                className="px-2 py-1 text-sm"
                name="keyword"
                defaultValue={router.query.keyword}
                type="text"
              />
              <button
                type="submit"
                className={cx(
                  "text-sm px-2 py-1 text-gray-100 bg-gray-500 flex items-center",
                  {
                    "bg-yellow-500":
                      isActive(Section.search) && router.query.keyword,
                  }
                )}
              >
                <svg className="h-4 fill-current " viewBox="0 0 512 512">
                  <path d="M507 507c-2 3-6 5-10 5s-8-2-11-5L343 365c-74 63-182 66-259 7C6 313-20 208 21 120S159-16 254 5s162 106 162 203c0 50-18 98-51 135l142 143c6 6 6 15 0 21zM384 208c0-97-79-176-176-176S32 111 32 208s79 176 176 176 176-79 176-176z" />
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
      <div className="flex-grow" />
      <TopicPager result={result} />
    </div>
  );
};
