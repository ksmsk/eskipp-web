import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "@shared/components/common/Loader";
import { getSearchQuery } from "@shared/client/api";

type Props = {};

export const TopicPage: NextPage<Props> = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    query: { keyword },
  } = useRouter();

  useEffect(() => {
    getSearchQuery(keyword as string).then((url) => {
      if (url) {
        router.replace(url);
      } else {
        setError(`"${keyword}" ilgili bir şey bulunamadı`);
      }
    });
  }, []);

  return !!error ? <p>{error}</p> : <Loader />;
};

export default TopicPage;
