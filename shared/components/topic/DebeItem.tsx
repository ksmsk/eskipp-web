import Link from "next/link";
import React, { useContext } from "react";
import { IDebe } from "@shared/data";
import { TopicContext } from "@shared/components/header/SubMenu";

type Props = {
  debe: IDebe;
};

export const DebeItem: React.FC<Props> = ({ debe }) => {
  const { closeMenu } = useContext(TopicContext);

  return (
    <li onClick={closeMenu}>
      <Link href={`/entry/${debe.EntryId}`}>
        <a className="flex px-4 py-2 text-sm">{debe.Title}</a>
      </Link>
    </li>
  );
};
