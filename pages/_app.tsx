import { Header } from "@shared/components/header";
import { setObject } from "@shared/utils/localStorage";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "@styles/main.css";
import { Sidebar } from "@shared/components/topic/Sidebar";
import { useService } from "@xstate/react";
import { topicService } from "@shared/states/topic.machine";
import { Section } from "@shared/client/enums";
import { http } from "@shared/services/http";

function MyApp({ Component, pageProps }) {
  const [busy, setBusy] = useState(true);

  const [, send] = useService(topicService);
  useEffect(() => {
    if (!localStorage.getItem("filters")) {
      setObject("filters", [
        { channelId: 1, channelName: "spor", enabled: true },
        { channelId: 2, channelName: "siyaset", enabled: true },
        { channelId: 4, channelName: "anket", enabled: true },
        { channelId: 5, channelName: "ilişkiler", enabled: true },
        { channelId: 10, channelName: "ekşi-sözlük", enabled: true },
        { channelId: 11, channelName: "yetişkin", enabled: true },
        { channelId: 39, channelName: "troll", enabled: true },
      ]);
    }
    if (!document?.cookie?.includes("auth_token")) {
      http()
        .get("/api/guest")
        .then(() => {
          send({
            type: "FETCH",
            payload: {
              section: Section.popular,
            },
          });
          setBusy(false);
        });
    } else {
      setBusy(false);
      send({
        type: "FETCH",
        payload: {
          section: Section.popular,
        },
      });
    }
  }, []);

  return (
    !busy && (
      <>
        <Head>
          <title>eksipp</title>
          <meta name="description" content="ekşi sözlük okuyucusu" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <div className="grid h-screen overflow-hidden bg-gray-700 grid-rows-layout">
          <Header />
          <div className="flex overflow-hidden">
            <Sidebar />
            <div className="w-full px-4 py-2 my-2 overflow-y-auto xl:w-1/2 scrollbar lg:px-4">
              <Component {...pageProps} />
              <div className="flex items-end w-full p-2 text-xs text-gray-100 xl:hidden">
                <p>
                  her türlü görüşleriniz ve sitedeki buglar ile ilgili{" "}
                  <a
                    className="text-yellow-500 hover:underline"
                    href="mailto:info@eksipp.com"
                  >
                    info@eksipp.com
                  </a>{" "}
                  adresine email atabilirsiniz.
                </p>
              </div>
            </div>
            <div className="items-end justify-end hidden w-1/4 p-1 text-xs text-right text-gray-100 xl:flex">
              <p className="max-w-sm">
                görüşleriniz ve sitedeki buglar ile ilgili{" "}
                <a
                  className="text-yellow-500 hover:underline"
                  href="mailto:info@eksipp.com"
                >
                  info@eksipp.com
                </a>{" "}
                adresine email atabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default MyApp;
