import type { KnitPattern } from '../models/knit';
import type { CompressedPattern, PatternSquare } from '../models/pattern';
import PatternHelper from './pattern-helper';

export default class PersistanceHelper {
  static colorString(color: string) {
    switch (color) {
      case '#ffffff': return 'White';
      case '#000000': return 'Black';
      default: return color;
    }
  }

  static createKnitString(name: string, reducedPatternWithSettings: KnitPattern) {
    let text = `-------- ${name} --------\r\n\r\n`;

    reducedPatternWithSettings.forEach((row, index) => {
      const isEven = (index + 1) % 2 === 0;
      text += `-------- Row ${index + 1} --------${(isEven) ? ' (Even)' : ''}\r\n`;
      row.forEach((entry) => {
        text += `Knit ${entry.count}: ${this.colorString(entry.colorIndex)}\r\n`;
      });
      text += '\r\n';
    });

    return text;
  }

  static compressPattern(sortedPattern: PatternSquare[]): CompressedPattern {
    const colorDict: Record<string, string> = {};
    let patternString = '';

    let previousColorAlias: string = '';
    let colorCount = 0;

    sortedPattern.forEach((point) => {
      let colorAlias = colorDict[point.colorIndex];

      if (!colorAlias) {
        colorDict[point.colorIndex] = `${Object.keys(colorDict).length + 1}`;
        colorAlias = colorDict[point.colorIndex];
      }

      if (!previousColorAlias || previousColorAlias === colorAlias) {
        colorCount += 1;
      } else {
        patternString += `${previousColorAlias}-${colorCount},`;
        colorCount = 1;
      }

      previousColorAlias = colorAlias;
    });

    patternString += `${previousColorAlias}-${colorCount}`;

    return {
      dim: PatternHelper.getDimensionsFromSortedPatten(sortedPattern),
      col: colorDict,
      pat: patternString,
    };
  }

  static decompressPattern({ dim, col, pat }: CompressedPattern) {
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
}
