import { format } from "fecha";
import React from "react";

type Props = {
  created: string;
  updated: string | null;
};

export const TimeStamp: React.FC<Props> = ({ created, updated }) => {
  const createdDate = new Date(created);
  const updatedDate = updated ? new Date(updated) : null;
  let sameDay: boolean;

  if (updatedDate) {
    sameDay =
      (updatedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 24) <= 1;
  }
  return (
    <span>
      {format(createdDate, "DD.MM.YYYY [-] HH:mm")}
      {sameDay === true && " ~ " + format(updatedDate, "HH:mm")}
      {sameDay === false && " ~ " + format(updatedDate, "DD.MM.YYYY [-] HH:mm")}
    </span>
  );
};
