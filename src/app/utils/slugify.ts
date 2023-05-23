import { default as nodeSlug } from "slugify";

export const slugify = (word: string) =>
  nodeSlug(word, { lower: true, strict: true });
