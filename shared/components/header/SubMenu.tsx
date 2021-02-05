import React, { useState } from "react";
import { Section } from "@shared/client/enums";
import { getTitles } from "@shared/client/popular";
import { TopicList } from "@shared/components/topic/TopicList";
import { ITopics } from "@shared/data";

type Props = {};

export const SectionContext = React.createContext(null);

export const SubMenu: React.FC<Props> = () => {
  const [section, setSection] = useState<Section>();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ITopics>();

  const toggleTitles = async (newSection: Section) => {
    if (section === newSection) {
      setSection(undefined);
    } else {
      setSection(newSection);
      setBusy(true);
      setResult(await getTitles(newSection));
      setBusy(false);
    }
  };

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      <div className="flex justify-between px-3 pb-2 text-sm">
        <button
          onClick={() => toggleTitles(Section.today)}
          className="px-1 text-gray-100"
        >
          bugün
        </button>
        <button
          onClick={() => toggleTitles(Section.popular)}
          className="px-1 text-gray-100"
        >
          gündem
        </button>
        <button className="px-1 text-gray-100">debe</button>
        <button className="px-1 text-gray-100">tarihte bugün</button>
        <button className="px-1 text-gray-100">çaylaklar</button>
      </div>
      {!!section && (
        <div className="max-h-full overflow-y-scroll">
          <TopicList topics={result?.Topics} busy={busy} />
        </div>
      )}
    </SectionContext.Provider>
  );
};
