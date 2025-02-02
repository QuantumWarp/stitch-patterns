import PatternHelper from '../../helpers/pattern-helper';

export default {
  sortedPattern() {
    return this.pattern.sort((a, b) => {
      if (a.x === b.x) return a.y > b.y ? 1 : -1;
      return a.x > b.x ? 1 : -1;
    });
  },
  bounds() {
    const xPoints = this.pattern.map((point) => point.x);
    const yPoints = this.pattern.map((point) => point.y);
    return {
      xMax: Math.max(...xPoints),
      xMin: Math.min(...xPoints),
      yMax: Math.max(...yPoints),
      yMin: Math.min(...yPoints),
    };
  },
  dimensions() {
    return PatternHelper.getDimensionsFromSortedPatten(this.sortedPattern);
  },
};
