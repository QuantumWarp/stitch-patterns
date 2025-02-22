import type { Pattern } from "../models/pattern";

const patternPrefix = "stitch-patterns-pattern-";

export const getPatterns = (): Pattern[] => {
  const keys = Object.keys(localStorage);
  const patternIds = keys.filter((x) => x.startsWith(patternPrefix)).map((x) => x.replace(patternPrefix, ""));
  const patterns = patternIds.map((x) => getPattern(x))
  return patterns.sort((a, b) => a.name.localeCompare(b.name));
}

export const getPattern = (id: string): Pattern => {
  const result = localStorage.getItem(`${patternPrefix}${id}`);
  if (!result) throw new Error("Pattern not found");
  return JSON.parse(result!);
}

export const savePattern = (pattern: Pattern): void => {
  localStorage.setItem(`${patternPrefix}${pattern.id}`, JSON.stringify(pattern));
}

export const deletePattern = (pattern: Pattern): void => {
  localStorage.removeItem(`${patternPrefix}${pattern.id}`);
}
