import { linkShortener } from "@shared/utils/helpers";

export class EntryParser {
  entry: string;
  constructor(rawEntry: string) {
    this.entry = rawEntry;
  }

  public parse() {
    this.absoluteLinkParser();
    this.bkzParser();
    this.inlineBkzParser();
    this.linkParser();
    return this.entry;
  }

  private absoluteLinkParser() {
    const regex = /(?<!\[|\(bkz[^\n]*?)https?:\/\/(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256})\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?!&//=]*)(?![^\[\]]*\])/g;

    this.entry = this.entry.replace(regex, (query) => {
      return `<a class="text-yellow-500" href="${query}">${linkShortener(
        query
      )}<svg class="h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>`;
    });
  }

  private bkzParser() {
    const regex = /\(bkz:(.*?)\)/g;

    this.entry = this.entry.replace(regex, (query) => {
      const trimmed = query.replace("(bkz:", "").slice(0, -1).trim();
      const splitted = trimmed.split("/");

      if (splitted.length > 1) {
        if (splitted[1].startsWith("#") && !isNaN(+splitted[1].substring(1))) {
          return `(bkz: <a class="text-yellow-500" href="/entry/${splitted[1].substring(
            1
          )}">${linkShortener(trimmed)}</a>)`;
        }
      }
      if (trimmed.startsWith("http")) {
        return `(bkz: <a class="text-yellow-500"  href="${trimmed}">${trimmed}<svg class="h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>)`;
      }
      if (trimmed.startsWith("#") && !isNaN(+trimmed.substring(1))) {
        return `(bkz: <a class="text-yellow-500" href="/entry/${trimmed.substring(
          1
        )}">${trimmed}</a>)`;
      }
      if (trimmed.length <= 50) {
        return `(bkz: <a class="text-yellow-500" href="/ara/${trimmed}">${trimmed}</a>)`;
      }

      return `(bkz: ${trimmed})`;
    });
  }

  private inlineBkzParser() {
    const regex = /(`)([^\n`]{1,50})(`)/g;

    this.entry = this.entry.replace(regex, (query) => {
      const splitted = query
        .replaceAll("`", "")
        .split(":")
        .map((x) => x.trim());

      if (splitted.length > 1) {
        if (splitted[1].startsWith("#") && !isNaN(+splitted[1].substring(1))) {
          return `${
            splitted[0]
          }<a class="text-yellow-500" href="/entry/${splitted[1].substring(
            1
          )}">*</a>`;
        }
        return `${splitted[0]}<a class="text-yellow-500" href="/ara/${splitted[1]}">*</a>`;
      }
      if (splitted[0].startsWith("#") && !isNaN(+splitted[0].substring(1))) {
        return `<a class="text-yellow-500" href="/entry/${splitted[0].substring(
          1
        )}">${splitted[0]}</a>`;
      }
      return `<a class="text-yellow-500" href="/ara/${splitted[0]}">${splitted[0]}</a>`;
    });
  }

  private linkParser() {
    const regex = /\[https?(.*?)\]/g;

    this.entry = this.entry.replace(regex, (query) => {
      const splitted = query.replaceAll("[", "").replaceAll("]", "").split(" ");

      return `<a class="text-yellow-500" href="${splitted[0]}">${
        splitted.length > 1
          ? linkShortener(splitted[1])
          : linkShortener(splitted[0])
      }<svg class="h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>`;
    });
  }
}
