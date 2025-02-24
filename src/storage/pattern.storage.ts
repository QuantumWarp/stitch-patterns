import type { Pattern } from '@/models/pattern';

const patternPrefix = 'stitch-patterns-pattern-';

export function getPatterns(): Pattern[] {
  const keys = Object.keys(localStorage);
  const patternIds = keys.filter((x) => x.startsWith(patternPrefix)).map((x) => x.replace(patternPrefix, ''));
  const patterns = patternIds.map((x) => getPattern(x))
  return patterns.sort((a, b) => a.name.localeCompare(b.name));
}

export function getPattern(id: string): Pattern {
  const result = localStorage.getItem(`${patternPrefix}${id}`);
  if (!result) throw new Error('Pattern not found');
  return JSON.parse(result!);
}

export function savePattern(pattern: Pattern): void {
  localStorage.setItem(`${patternPrefix}${pattern.id}`, JSON.stringify(pattern));
}

export function deletePattern(pattern: Pattern): void {
  localStorage.removeItem(`${patternPrefix}${pattern.id}`);
}
