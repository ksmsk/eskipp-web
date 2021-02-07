import { Section } from "@shared/client/enums";
import { TopicContext } from "@shared/components/header/SubMenu";
import { currentYear } from "@shared/utils/helpers";
import React, { useContext, useMemo } from "react";
import cx from "classnames";

type Props = {
  count: number;
  cursor: number;
};

export const TopicListPager: React.FC<Props> = ({ count, cursor }) => {
  const { section, year, fetcher } = useContext(TopicContext);

  const isPast = useMemo(() => {
    return section === Section.past;
  }, [section]);

  return count > 1 ? (
    <div
      className={cx("flex items-center px-4 py-2 text-gray-100", {
        "justify-between": isPast,
        "justify-center": !isPast,
      })}
    >
      {isPast && (
        <div className="flex justify-center">
          <select
            defaultValue={year}
            className="p-1 text-gray-100 bg-gray-500 rounded-sm"
            onChange={(e) => {
              fetcher(Section.past, { year: parseInt(e.currentTarget.value) });
            }}
          >
            {Array(currentYear - 1999)
              .fill(0)
              .map((_, i) => (
                <option value={1999 + i} key={i}>
                  {1999 + i}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          disabled={cursor <= 1}
          className="px-2 mr-2 bg-gray-700 rounded-sm"
          style={{ visibility: cursor <= 1 ? "hidden" : "visible" }}
          onClick={() => fetcher(section, { page: cursor - 1, year })}
        >
          {"<"}
        </button>
        <select
          className="p-1 bg-gray-700 rounded-sm"
          value={cursor}
          onChange={(e) =>
            fetcher(section, { page: parseInt(e.currentTarget.value), year })
          }
        >
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>
        <span className="mx-2">/</span>
        <button
          className="px-2 bg-gray-500 rounded-sm"
          onClick={() => fetcher(section, { page: count, year })}
        >
          {count}
        </button>
        <button
          disabled={cursor >= count}
          className="px-2 ml-2 bg-gray-700 rounded-sm"
          style={{ visibility: cursor >= count ? "hidden" : "visible" }}
          onClick={() => fetcher(section, { page: cursor + 1, year })}
        >
          {">"}
        </button>
      </div>
    </div>
  ) : null;
};
