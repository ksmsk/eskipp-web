import { SectionContext } from "@shared/components/header/SubMenu";
import Link from "next/link";
import React, { useContext } from "react";
import { IDebe } from "@shared/data";

type Props = {
  debe: IDebe;
};

export const DebeItem: React.FC<Props> = ({ debe }) => {
  const { setSection } = useContext(SectionContext);

  return (
    <li onClick={() => setSection(undefined)}>
      <Link href={`/entry/${debe.EntryId}`}>
        <a className="flex px-4 py-2 text-sm">{debe.Title}</a>
      </Link>
    </li>
  );
};
