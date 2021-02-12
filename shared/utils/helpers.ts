import { Section } from "@shared/client/enums";
import { ITopic } from "@shared/data";
import slugify from "slugify";

export const currentYear = new Date().getFullYear();

export const expireDate = (seconds: number) =>
  new Date(new Date().getTime() + seconds * 1000);

export const debounce = (func: Function, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};

export const linkShortener = (url: string) => {
  url = url.trim();
  if (!url.startsWith("http")) {
    return url;
  }
  if (url.length > 30) {
    return url.slice(0, 30) + "...";
  }
  return url;
};

export const sectionTr = (section: Section) => {
  switch (section) {
    case Section.popular:
      return "gündem";
    case Section.today:
      return "bugün";
    case Section.all:
      return "tümü";
    case Section.past:
      return "tarihte bugün";
  }
};

export const topicSlug = ({ TopicId, Title }: ITopic) => {
  return `${slugify(Title)}--${TopicId}`;
};
