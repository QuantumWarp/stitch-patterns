import type { Dimensions } from "../models/dimensions";
import type { GridSquares } from "../models/grid";
import type { KnitPattern, KnitRow, KnitSettings, Stitch, StitchInfo } from "../models/knit";

export default class PatternHelper {
  static createFilledPattern(dimensions: Dimensions, color: string) {
    const pattern = [];
    for (let x = 0; x < dimensions.width; x += 1) {
      for (let y = 0; y < dimensions.height; y += 1) {
        pattern.push({ x, y, color });
      }
    }
    return pattern;
  }

  static getDimensionsFromSortedPatten(sortedPattern: GridSquares) {
    const firstPoint = sortedPattern[0];
    const lastPoint = sortedPattern[sortedPattern.length - 1];
    return {
      width: lastPoint.x - firstPoint.x + 1,
      height: lastPoint.y - firstPoint.y + 1,
    };
  }

  static countColorsForPalette(pattern: GridSquares) {
    const colorDict: Record<string, number> = {};
    pattern.forEach((point) => {
      if (!colorDict[point.color]) {
        colorDict[point.color] = 0;
      }
      colorDict[point.color] += 1;
    });
    let orderedColors = Object.keys(colorDict)
      .sort((a, b) => (colorDict[a] < colorDict[b] ? 1 : -1));

    if (orderedColors.length === 1) {
      const newColor = orderedColors[0] === '#ffffff' ? '#000000' : '#ffffff';
      orderedColors = [newColor, ...orderedColors];
    }

    return orderedColors;
  }

  static createStitchInfo(knitPattern: KnitPattern, targetStitch: Stitch): StitchInfo {
    const selectedRow = knitPattern.find(
      (row) => Boolean(row.find(
        (stitch) => stitch === targetStitch,
      )),
    );
    if (!selectedRow) return {
      row: [], stitchIndex: 0,
      isStartStitch: false, isEndStitch: false,
      rowIndex: 0, isStartRow: false, isEndRow: false
    };
    const stitchIndex = selectedRow.indexOf(targetStitch);
    const rowIndex = knitPattern.indexOf(selectedRow);
    return {
      row: selectedRow,
      stitchIndex,
      isStartStitch: stitchIndex === 0,
      isEndStitch: stitchIndex === selectedRow.length - 1,
      rowIndex,
      isStartRow: rowIndex === 0,
      isEndRow: rowIndex === knitPattern.length - 1,
    };
  }

  static applyReducePatternSettings(reducedPattern: KnitPattern, {
    fromTop,
    fromRight,
    reverseEven,
    doubleStitch,
  }: KnitSettings) {
    let finalPattern = [...reducedPattern];
    if (fromTop) {
      finalPattern = finalPattern.reverse();
    }
    if (fromRight) {
      finalPattern = finalPattern.map((row) => [...row].reverse());
    }
    if (reverseEven) {
      finalPattern = finalPattern.map((row, index) => (index % 2 === 1 ? [...row].reverse() : row));
    }
    if (doubleStitch) {
      finalPattern = finalPattern.map((row) => [...row].map((x) => ({ ...x, count: x.count * 2 })));
    }
    return finalPattern;
  }

  static reducePattern(pattern: GridSquares) {
    return PatternHelper
      .sortedRows(pattern)
      .map((x) => PatternHelper.reduceSortedRow(x));
  }

  static reduceSortedRow(sortedRow: GridSquares) {
    return sortedRow.reduce((r, a) => {
      const lastEntry = r[r.length - 1];
      if (lastEntry && lastEntry.color === a.color) {
        lastEntry.count += 1;
      } else {
        r.push({ color: a.color, count: 1 });
      }
      return r;
    }, [] as KnitRow);
  }

  static sortedRows(pattern: GridSquares) {
    const groupedRows = PatternHelper.groupBy(pattern, (pt) => pt.y);
    return Object.keys(groupedRows)
      .map((x) => groupedRows[Number(x)])
      .sort((a, b) => (a[0].y > b[0].y ? -1 : 1))
      .map((row) => row.sort((a, b) => (a.x > b.x ? 1 : -1)));
  }

  static groupBy<T, TVal extends string | number>(array: T[], propFunc: (entry: T) => TVal) {
    return array.reduce((r, a) => {
      const propVal = propFunc(a);
       
      r[propVal] = [...r[propVal] || [], a];
      return r;
    }, {} as Record<TVal, T[]>);
  }
}
