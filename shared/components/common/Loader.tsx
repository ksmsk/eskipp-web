import { Spinner } from "@shared/components/common/Spinner";
import React from "react";

type Props = {};

export const Loader: React.FC<Props> = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 85px)" }}
    >
      <Spinner />
    </div>
  );
};
