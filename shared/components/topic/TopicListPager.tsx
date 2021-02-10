import { Section } from "@shared/client/enums";
import { currentYear } from "@shared/utils/helpers";
import React, { useMemo } from "react";
import cx from "classnames";
import { topicService } from "@shared/states/topic.machine";
import { useService } from "@xstate/react";

type Props = {
  count: number;
  cursor: number;
};

export const TopicListPager: React.FC<Props> = ({ count, cursor }) => {
  const [state, send] = useService(topicService);
  const isPast = useMemo(() => {
    return state.context.section === Section.past;
  }, [state.context.section]);

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
            defaultValue={state.context.year}
            className="p-1 text-gray-100 bg-gray-500 rounded-sm"
            onChange={(e) => {
              send({
                type: "FETCH",
                payload: {
                  section: Section.past,
                  year: parseInt(e.currentTarget.value),
                },
              });
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
          onClick={() => {
            send({
              type: "FETCH",
              payload: {
                section: state.context.section,
                year: state.context.year,
                page: cursor - 1,
              },
            });
          }}
        >
          {"<"}
        </button>
        <select
          className="p-1 bg-gray-700 rounded-sm md:bg-gray-600"
          value={cursor}
          onChange={(e) => {
            send({
              type: "FETCH",
              payload: {
                section: state.context.section,
                year: state.context.year,
                page: parseInt(e.currentTarget.value),
              },
            });
          }}
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
          onClick={() => {
            send({
              type: "FETCH",
              payload: {
                section: state.context.section,
                year: state.context.year,
                page: count,
              },
            });
          }}
        >
          {count}
        </button>
        <button
          disabled={cursor >= count}
          className="px-2 ml-2 bg-gray-700 rounded-sm"
          style={{ visibility: cursor >= count ? "hidden" : "visible" }}
          onClick={() => {
            send({
              type: "FETCH",
              payload: {
                section: state.context.section,
                year: state.context.year,
                page: cursor + 1,
              },
            });
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  ) : null;
};
