import { NextPage } from "next";
import React, { useEffect } from "react";
import { useService } from "@xstate/react";
import { topicService } from "@shared/states/topic.machine";
import { useRouter } from "next/router";
import { Loader } from "@shared/components/common/Loader";
import { Section } from "@shared/client/enums";
import { topicSlug } from "@shared/utils/helpers";

type Props = {};

export const HomePage: NextPage<Props> = () => {
  const router = useRouter();
  const [state] = useService(topicService);

  useEffect(() => {
    if (state.context.topicResult) {
      router.replace({
        pathname: "/topic/[slug]",
        query: {
          slug: topicSlug(state.context.topicResult.Topics[0]),
          mode: Section.popular,
        },
      });
    }
  }, [state.value]);

  return <Loader />;
};

export default HomePage;
