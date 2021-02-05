import { Header } from "@shared/components/header";
import React, { useEffect } from "react";
import { setObject } from "shared/utils/localStorage";

import "@styles/main.css";

function MyApp({ Component, pageProps }) {
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
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-700">
      <Header />
      <div className="overflow-y-scroll">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
