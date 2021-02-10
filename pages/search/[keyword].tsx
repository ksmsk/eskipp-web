import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { Loader } from "@shared/components/common/Loader";
import { getSearchQuery } from "@shared/client/api";
import { WithRouterProps } from "next/dist/client/with-router";

type Props = {} & WithRouterProps;

export const TopicPage: NextPage<Props> = ({ router }) => {
  const [error, setError] = useState<string>();

  useEffect(() => {
    getSearchQuery(router.query.keyword as string).then((url) => {
      if (url) {
        router.replace(url);
      } else {
        setError(`"${router.query.keyword}" ilgili bir şey bulunamadı`);
      }
    });
  }, [router.query.keyword]);

  return !!error ? <p>{error}</p> : <Loader />;
};

export default withRouter(TopicPage);
