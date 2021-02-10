import React from "react";
import { useService } from "@xstate/react";
import { Section } from "@shared/client/enums";
import { Loader } from "@shared/components/common/Loader";
import { TopicList } from "@shared/components/topic/TopicList";
import { topicService } from "@shared/states/topic.machine";
import channelRepo from "@mocks/channels.json";
import cx from "classnames";

type Props = {};

export const SubMenu: React.FC<Props> = () => {
  const [state, send] = useService(topicService);

  return (
    <>
      <div className="flex justify-between row-auto px-3 pb-2 text-sm border-b-2 border-gray-600 md:hidden md:justify-start">
        <button
          onClick={() =>
            send({ type: "TOGGLE", payload: { section: Section.today } })
          }
          className="px-1 text-xs text-gray-100"
        >
          bugün
        </button>
        <button
          onClick={() =>
            send({ type: "TOGGLE", payload: { section: Section.popular } })
          }
          className="px-1 text-xs text-gray-100"
        >
          gündem
        </button>
        <button
          onClick={() =>
            send({ type: "TOGGLE", payload: { section: Section.debe } })
          }
          className="px-1 text-xs text-gray-100"
        >
          debe
        </button>
        <button
          onClick={() =>
            send({
              type: "TOGGLE",
              payload: { section: Section.past, year: state.context.year },
            })
          }
          className="px-1 text-xs text-gray-100"
        >
          tarihte bugün
        </button>
        <select
          className="flex-shrink-0 py-1 text-xs text-gray-100 bg-gray-800 rounded-sm scrollbar"
          onClick={(e) => {
            if (e.detail === 0 && e.currentTarget.value) {
              send({
                type: "TOGGLE",
                payload: {
                  section: e.currentTarget.value as Section,
                },
              });
            }
          }}
        >
          <option value="" disabled>
            kanallar
          </option>
          {channelRepo.Data.AllChannels.map((channel) => (
            <option
              className="p-2"
              value={`channel/${channel.Name}`}
              key={channel.Id}
            >
              {channel.DisplayName}
            </option>
          ))}
        </select>
      </div>
      <div className="justify-between hidden row-auto px-3 pb-2 text-sm border-b-2 border-gray-600 md:flex md:justify-start">
        <button
          onClick={() =>
            send({ type: "FETCH", payload: { section: Section.today } })
          }
          className={cx(
            "px-2 py-1 text-gray-100 rounded-sm md:mr-6 md:text-lg",
            {
              "bg-yellow-500": state.context.section === Section.today,
            }
          )}
        >
          bugün
        </button>
        <button
          onClick={() =>
            send({ type: "FETCH", payload: { section: Section.popular } })
          }
          className={cx(
            "px-2 py-1 text-gray-100 rounded-sm md:mr-6 md:text-lg",
            {
              "bg-yellow-500": state.context.section === Section.popular,
            }
          )}
        >
          gündem
        </button>
        <button
          onClick={() =>
            send({ type: "FETCH", payload: { section: Section.debe } })
          }
          className={cx(
            "px-2 py-1 text-gray-100 rounded-sm md:mr-6 md:text-lg",
            {
              "bg-yellow-500": state.context.section === Section.debe,
            }
          )}
        >
          debe
        </button>
        <button
          onClick={() =>
            send({
              type: "FETCH",
              payload: { section: Section.past, year: state.context.year },
            })
          }
          className={cx(
            "px-2 py-1 text-gray-100 rounded-sm md:mr-6 md:text-lg",
            {
              "bg-yellow-500": state.context.section === Section.past,
            }
          )}
        >
          tarihte bugün
        </button>
        <select
          className={cx(
            "px-2 py-1 text-gray-100 rounded-sm bg-gray-800 md:mr-6 md:text-lg scrollbar",
            {
              "bg-yellow-500": state.context.section.startsWith("channel"),
            }
          )}
          value={
            state.context.section.startsWith("channel")
              ? state.context.section
              : ""
          }
          onChange={(e) =>
            send({
              type: "FETCH",
              payload: {
                section: e.currentTarget.value as Section,
              },
            })
          }
        >
          <option value="" disabled>
            kanallar
          </option>
          {channelRepo.Data.AllChannels.map((channel) => (
            <option
              className="p-2"
              value={`channel/${channel.Name}`}
              key={channel.Id}
            >
              {channel.DisplayName}
            </option>
          ))}
        </select>
      </div>
      {state.context.opened && (
        <div
          className="py-2 md:hidden"
          style={{ height: "calc(100vh - 95px)" }}
        >
          {state.matches("fetching") && <Loader />}
          {state.matches("fetched") && (
            <TopicList result={state.context.topicResult} />
          )}
          {state.matches("error") && <p>error</p>}
        </div>
      )}
    </>
  );
};
