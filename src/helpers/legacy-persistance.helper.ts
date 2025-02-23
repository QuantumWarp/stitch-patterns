import type { LegacyCompressedPattern } from '../models/pattern';
import PatternHelper from './pattern-helper';

export function legacyImportPattern({ dim, col, pat }: LegacyCompressedPattern) {
  const splitPat = pat.split(',');
  const blankPattern = PatternHelper.createFilledPattern(dim, 0);

  let left: number | null;
  let color: string;

  const pattern = blankPattern.map((point) => {
    if (!left) {
      const split = splitPat.shift()!.split('-');
      color = Object.keys(col).find((x) => col[x] === split[0])!;
      left = Number(split[1]);
    }
    const newPoint = { ...point, color };
    left -= 1;
    return newPoint;
  });

  return pattern;
}
