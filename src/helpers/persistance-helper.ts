import type { CompressedPattern, Pattern } from '../models/pattern';
import { savePattern } from '../storage/pattern.storage';
import FileHelper from './file-helper';
import PatternHelper from './pattern-helper';
import { v4 as uuid } from 'uuid';

export function exportPattern(pattern: Pattern) {
  const compPattern = compressPattern(pattern);
  FileHelper.download(`${pattern.name || "pattern"}.json`, JSON.stringify(compPattern));
}

export async function importPattern(e: InputEvent) {
  try {
    const compPatternString = await FileHelper.importRaw(e);
    const compPattern = JSON.parse(compPatternString);
    const pattern = decompressPattern(compPattern);
    pattern.id = uuid();
    savePattern(pattern);
  } catch {
    console.warn('Import failed');
  }
}

function compressPattern(pattern: Pattern): CompressedPattern {
  const { squares, ...compPattern } = pattern;
  const sortedSquares = squares.sort((a, b) => {
    if (a.x === b.x) return a.y > b.y ? 1 : -1;
    return a.x > b.x ? 1 : -1;
  })

  let patternString = '';
  let previousColorIndex = sortedSquares[0].colorIndex;
  let colorCount = 0;

  sortedSquares.forEach((square) => {
    const isSame = previousColorIndex === square.colorIndex;

    if (isSame) {
      colorCount += 1;
    } else {
      patternString += colorString(previousColorIndex, colorCount) + ",";
      colorCount = 1;
      previousColorIndex = square.colorIndex;
    }
  });

  patternString += colorString(previousColorIndex, colorCount);

  return { ...compPattern, patternString };
}

function colorString(colorIndex: number, count: number) {
  if (count < 3) return Array(count).fill(colorIndex);
  return colorIndex + "-" + count;
}

function decompressPattern(compPattern: CompressedPattern): Pattern {
  const { patternString, ...pattern } = compPattern;
  const splitPat = patternString.split(',');
  let squares = PatternHelper.createFilledPattern(pattern.dimensions, 0);
  const sortedSquares = squares.sort((a, b) => {
    if (a.x === b.x) return a.y > b.y ? 1 : -1;
    return a.x > b.x ? 1 : -1;
  })

  let left: number | null;
  let colorIndex: number;

  squares = sortedSquares.map((point) => {
    if (!left) {
      const nextEntry = splitPat.shift()!;
      const dashed = nextEntry.includes('-');
      colorIndex = Number(dashed ? nextEntry.split('-')[0] : nextEntry[0]);
      left = Number(dashed ? nextEntry.split('-')[1] : nextEntry.length);
    }
    left -= 1;
    return { ...point, colorIndex };
  });
  console.log(squares)

  return { ...pattern, squares };
}
