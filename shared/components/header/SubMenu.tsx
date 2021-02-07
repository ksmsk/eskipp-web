import React, { useState } from "react";
import { Section } from "@shared/client/enums";
import { getTitles } from "@shared/client/api";
import { ITopics } from "@shared/data";
import { currentYear } from "@shared/utils/helpers";
import { Loader } from "@shared/components/common/Loader";
import { TopicList } from "@shared/components/topic/TopicList";

type Props = {};

export const TopicContext = React.createContext<{
  year: number;
  section?: Section;
  closeMenu: () => void;
  fetcher: (
    section: Section,
    options: { year?: number; page?: number }
  ) => void;
}>(null);

export const SubMenu: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [cachedSection, setCachedSection] = useState<Section>();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ITopics>();
  const [cachedYear, setCachedYear] = useState(() => currentYear - 1);

  const fetcher = async (
    section: Section,
    { year, page }: { year?: number; page?: number } = { page: 1 }
  ) => {
    setBusy(true);
    setCachedSection(section);
    if (year) {
      setCachedYear(year);
    }
    setResult(
      await getTitles(section, {
        year,
        page,
      })
    );
    setBusy(false);
  };

  const closeMenu = () => {
    setOpen(false);
    setCachedSection(undefined);
  };

  const toggleMenu = async (
    section: Section,
    { year, page }: { year?: number; page?: number } = { page: 1 }
  ) => {
    if (section === cachedSection) {
      closeMenu();
    } else {
      setOpen(true);
      await fetcher(section, { year, page });
    }
  };

  return (
    <TopicContext.Provider
      value={{
        year: cachedYear,
        section: cachedSection,
        closeMenu,
        fetcher,
      }}
    >
      <div className="flex justify-between px-3 pb-2 text-sm md:justify-start">
        <button
          onClick={() => toggleMenu(Section.today)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          bugün
        </button>
        <button
          onClick={() => toggleMenu(Section.popular)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          gündem
        </button>
        <button
          onClick={() => toggleMenu(Section.debe)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          debe
        </button>
        <button
          onClick={() => toggleMenu(Section.past, { year: cachedYear })}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          tarihte bugün
        </button>
      </div>
      <div className="border-b-2 border-gray-600 " />
      {open && (busy ? <Loader /> : <TopicList result={result} />)}
    </TopicContext.Provider>
  );
};
