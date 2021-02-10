import React from "react";
import { useService } from "@xstate/react";
import { topicService } from "@shared/states/topic.machine";
import { TopicList } from "@shared/components/topic/TopicList";
import { Loader } from "@shared/components/common/Loader";

type Props = {};

export const Sidebar: React.FC<Props> = () => {
  const [state] = useService(topicService);

  return (
    <div className="flex-shrink-0 hidden max-h-full py-2 w-72 md:flex lg:w-96 xl:w-1/4">
      {state.matches("fetching") ? (
        <Loader />
      ) : (
        !!state.context.topicResult && (
          <TopicList result={state.context.topicResult} />
        )
      )}
      {state.matches("error") && <p>error</p>}
    </div>
  );
};
