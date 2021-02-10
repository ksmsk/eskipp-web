import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IAuthor } from "@shared/data";
import { AuthorContent } from "@shared/components/author/AuthorContent";
import { getAuthor } from "@shared/client/author";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

type Props = {} & WithRouterProps;

export const HomePage: NextPage<Props> = ({
  router: {
    query: { nick },
  },
}) => {
  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<IAuthor>();

  useEffect(() => {
    if (nick) {
      setBusy(true);
      getAuthor((nick as string).replaceAll("-", " ")).then((data) => {
        setResult(data);
        setBusy(false);
      });
    }
  }, [nick]);

  return <AuthorContent busy={busy} result={result} />;
};

export default withRouter(HomePage);
