import { Section } from "@shared/client/enums";
import { getTopics, GetTopicsOptions } from "@shared/client/topics";
import { ITopics } from "@shared/data";
import { currentYear } from "@shared/utils/helpers";
import { Machine, assign } from "xstate";
import { interpret } from "xstate";

interface TopicStateSchema {
  states: {
    initial: {};
    fetching: {};
    fetched: {};
    error: {};
  };
}

type TopicFetchEvent = { type: "FETCH"; payload: GetTopicsOptions };
type TopicToggleEvent = { type: "TOGGLE"; payload: GetTopicsOptions };
type TopicCloseEvent = { type: "CLOSE" };

type TopicEvent = TopicFetchEvent | TopicToggleEvent | TopicCloseEvent;

type TopicContext = {
  topicResult: ITopics | null;
  section: Section | null;
  opened: boolean;
  year: number;
  keyword?: string;
};

const topicMachine = Machine<TopicContext, TopicStateSchema, TopicEvent>({
  id: "topic",
  initial: "initial",
  context: {
    topicResult: null,
    section: null,
    opened: false,
    year: currentYear - 1,
  },
  states: {
    initial: {
      entry: assign<TopicContext>({
        opened: false,
      }),
      on: {
        FETCH: {
          target: "fetching",
          actions: [
            assign<TopicContext, TopicFetchEvent>({
              section: (_, e) => e.payload.section,
              year: (context, e) => e.payload.year ?? context.year,
            }),
          ],
        },
        TOGGLE: {
          target: "fetching",
          actions: assign<TopicContext, TopicToggleEvent>({
            opened: true,
            section: (_, event) => event.payload.section,
            keyword: (_, event) => event.payload.keyword,
          }),
        },
      },
    },
    fetching: {
      invoke: {
        id: "getTopics",
        src: (context, event: TopicFetchEvent) =>
          getTopics({ ...event.payload, keyword: context.keyword }),
        onDone: {
          target: "fetched",
          actions: [
            assign<TopicContext, any>({
              topicResult: (_, event) => event.data,
            }),
          ],
        },
        onError: {
          target: "error",
        },
      },
    },
    fetched: {
      on: {
        CLOSE: {
          target: "initial",
        },
        FETCH: {
          target: "fetching",
          actions: [
            assign<TopicContext, TopicFetchEvent>({
              section: (_, e) => e.payload.section,
              year: (context, e) => e.payload.year ?? context.year,
            }),
          ],
        },
        TOGGLE: [
          {
            target: "initial",
            cond: (context, event) => {
              return (
                context.section !== Section.search &&
                context.section === event.payload.section &&
                context.opened
              );
            },
          },
          {
            target: "fetching",
            actions: assign<TopicContext, TopicToggleEvent>({
              section: (_, e) => e.payload.section,
              year: (context, e) => e.payload.year ?? context.year,
              keyword: (_, event) => event.payload.keyword,
              opened: true,
            }),
          },
        ],
      },
    },
    error: {
      entry: assign<TopicContext>({
        topicResult: null,
        opened: false,
        section: null,
      }),
    },
  },
});

export const topicService = interpret(topicMachine, { devTools: true }).start();
