import PatternHelper from './pattern-helper';

class PersistanceHelper {
  static createSaveInfo(getters) {
    return {
      saveDate: new Date(),
      detail: getters.patternDetails,
      pattern: PersistanceHelper.compressPattern(getters.sortedPattern),
    };
  }

  static createIndexInfo(getters) {
    return {
      ...getters.patternDetails,
      saveDate: new Date(),
    };
  }

  static compressPattern(sortedPattern) {
    const colorDict = {};
    let patternString = '';

    let previousColorAlias;
    let colorCount = 0;

    sortedPattern.forEach((point) => {
      let colorAlias = colorDict[point.color];

      if (!colorAlias) {
        colorDict[point.color] = `${Object.keys(colorDict).length + 1}`;
        colorAlias = colorDict[point.color];
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

  static decompressPattern({ dim, col, pat }) {
    const splitPat = pat.split(',');
    const blankPattern = PatternHelper.createFilledPattern(dim, '#ffffff');

    let left;
    let color;

    const pattern = blankPattern.map((point) => {
      if (!left) {
        const split = splitPat.shift().split('-');
        color = Object.keys(col).find((x) => col[x] === split[0]);
        left = Number(split[1]);
      }
      const newPoint = { ...point, color };
      left -= 1;
      return newPoint;
    });

    return pattern;
  }
}

export default PersistanceHelper;
