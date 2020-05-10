class PatternHelper {
  static createFilledPattern(dimensions, color) {
    const pattern = [];
    for (let x = 0; x < dimensions.width; x += 1) {
      for (let y = 0; y < dimensions.height; y += 1) {
        pattern.push({ x, y, color });
      }
    }
    return pattern;
  }

  static getDimensionsFromSortedPatten(sortedPattern) {
    const firstPoint = sortedPattern[0];
    const lastPoint = sortedPattern[sortedPattern.length - 1];
    return {
      width: lastPoint.x - firstPoint.x + 1,
      height: lastPoint.y - firstPoint.y + 1,
    };
  }

  static countColorsForPalette(pattern) {
    const colorDict = {};
    pattern.forEach((point) => {
      if (!colorDict[point.color]) {
        colorDict[point.color] = 0;
      }
      colorDict[point.color] += 1;
    });
    const orderedColors = Object.keys(colorDict)
      .sort((a, b) => (colorDict[a] < colorDict[b] ? 1 : -1));
    return orderedColors;
  }

  static applyReducePatternSettings(reducedPattern) {
    return reducedPattern;
  }

  static reducePattern(pattern) {
    return PatternHelper
      .sortedRows(pattern)
      .map((x) => PatternHelper.reduceSortedRow(x));
  }

  static reduceSortedRow(sortedRow) {
    return sortedRow.reduce((r, a) => {
      const lastEntry = r[r.length - 1];
      if (lastEntry && lastEntry.color === a.color) {
        lastEntry.count += 1;
      } else {
        r.push({ color: a.color, count: 1 });
      }
      return r;
    }, []);
  }

  static sortedRows(pattern) {
    const groupedRows = PatternHelper.groupBy(pattern, (pt) => pt.y);
    return Object.keys(groupedRows)
      .map((x) => groupedRows[x])
      .sort((a, b) => (a[0].y > b[0].y ? 1 : -1))
      .map((row) => row.sort((a, b) => (a.x > b.x ? 1 : -1)));
  }

  static groupBy(array, propFunc) {
    return array.reduce((r, a) => {
      const propVal = propFunc(a);
      // eslint-disable-next-line no-param-reassign
      r[propVal] = [...r[propVal] || [], a];
      return r;
    }, {});
  }
}

export default PatternHelper;
