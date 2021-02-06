import React, { useState } from "react";
import { Section } from "@shared/client/enums";
import { getTitles } from "@shared/client/api";
import { TopicList } from "@shared/components/topic/TopicList";
import { ITopics } from "@shared/data";
import { currentYear } from "@shared/utils/helpers";

type Props = {};

export const SectionContext = React.createContext(null);

export const SubMenu: React.FC<Props> = () => {
  const [section, setSection] = useState<Section>();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ITopics>();
  const [year, setYear] = useState(() => currentYear - 1);

  const toggleTitles = async (newSection: Section, newYear?: number) => {
    if (!newYear && section === newSection) {
      setSection(undefined);
    } else {
      setSection(newSection);
      setBusy(true);
      if (newSection === Section.past) {
        setResult(
          await getTitles(newSection, {
            year: newYear ?? year,
          })
        );
      } else {
        setResult(await getTitles(newSection));
      }
      setBusy(false);
    }
  };

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      <div className="flex justify-between px-3 pb-2 text-sm md:justify-start">
        <button
          onClick={() => toggleTitles(Section.today)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          bugün
        </button>
        <button
          onClick={() => toggleTitles(Section.popular)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          gündem
        </button>
        <button
          onClick={() => toggleTitles(Section.debe)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          debe
        </button>
        <button
          onClick={() => toggleTitles(Section.past)}
          className="px-1 text-gray-100 md:mr-6 md:text-lg"
        >
          tarihte bugün
        </button>
        {/* <button
          onClick={() => toggleTitles(Section.rookie)}
          className="px-1 text-gray-100"
        >
          çaylaklar
        </button> */}
      </div>
      {section === Section.past && (
        <div className="flex justify-center pb-2">
          <select
            value={year}
            className="p-1 text-gray-100 bg-gray-500 rounded-sm"
            onChange={(e) => {
              setYear(parseInt(e.currentTarget.value));
              toggleTitles(Section.past, parseInt(e.currentTarget.value));
            }}
          >
            {Array(currentYear - 1999)
              .fill(0)
              .map((_, i) => (
                <option value={1999 + i} key={i}>
                  {1999 + i}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="border-b-2 border-gray-600 " />
      {!!section && (
        <div className="max-h-full overflow-y-scroll">
          <TopicList
            topics={result?.Topics}
            debes={result?.DebeItems}
            year={year}
            busy={busy}
          />
        </div>
      )}
    </SectionContext.Provider>
  );
};
