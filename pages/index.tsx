import { NextPage } from "next";
import React, { useEffect } from "react";
import { useService } from "@xstate/react";
import { topicService } from "@shared/states/topic.machine";
import { useRouter } from "next/router";
import slugify from "slugify";
import { Loader } from "@shared/components/common/Loader";

type Props = {};

export const HomePage: NextPage<Props> = () => {
  const router = useRouter();
  const [state] = useService(topicService);

  useEffect(() => {
    if (state.context.topicResult) {
      router.replace(
        `/topic/${slugify(state.context.topicResult.Topics[0].Title)}--${
          state.context.topicResult.Topics[0].TopicId
        }?mode=popular`
      );
    }
  }, [state.value]);

  return <Loader />;
};

export default HomePage;
