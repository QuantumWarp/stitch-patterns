import PatternHelper from './pattern-helper';

class PersistanceHelper {
  static colorString(color) {
    switch (color) {
      case '#ffffff': return 'White';
      case '#000000': return 'Black';
      default: return color;
    }
  }

  static createKnitString(name, reducedPatternWithSettings) {
    let text = `-------- ${name} --------\r\n\r\n`;

    reducedPatternWithSettings.forEach((row, index) => {
      const isEven = (index + 1) % 2 === 0;
      text += `-------- Row ${index + 1} --------${(isEven) ? ' (Even)' : ''}\r\n`;
      row.forEach((entry) => {
        text += `Knit ${entry.count}: ${this.colorString(entry.color)}\r\n`;
      });
      text += '\r\n';
    });

    return text;
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
