import { v4 as uuid } from 'uuid';
import type { CompressedPattern, LegacyCompressedPattern, Pattern, PatternSquare } from '@/models/pattern';
import { PatternHelper } from './pattern.helper';

export function isLegacyPattern(compPattern: CompressedPattern) {
  const test = compPattern as unknown as LegacyCompressedPattern;
  return Boolean(test.details);
}

export function legacyImportPattern(compPattern: CompressedPattern): Pattern {
  const legacyPattern = compPattern as unknown as LegacyCompressedPattern;
  const { pattern } = legacyPattern;
  const { pat, dim, col } = pattern;

  const splitPat = pat.split(',');
  const blankSquares = PatternHelper.createFilledPattern(dim, 0);

  let left: number | null;
  let colorIndex: number;
  const colors = Object.keys(col);

  const squares = blankSquares.map((point) => {
    if (!left) {
      const split = splitPat.shift()!.split('-');
      colorIndex = Object.values(col).indexOf(split[0]);
      left = Number(split[1]);
    }
    const newPoint: PatternSquare = { ...point, colorIndex };
    left -= 1;
    return newPoint;
  });

  return {
    id: uuid(),
    name: legacyPattern.details.name,
    dimensions: dim,
    colors: colors,
    squares
  };
}
