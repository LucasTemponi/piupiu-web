import { imageUrlRegex } from "../consts";

export const checkForImageLinks = (
  text?: string,
  applyMatch?: (match: string) => void
) => {
  if (!text) return text || "";
  const match = text.match(imageUrlRegex);
  if (!match) return text;
  applyMatch?.(match[0]);
  return text.replace(match[0], "");
};
