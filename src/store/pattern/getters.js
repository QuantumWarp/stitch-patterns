import PatternHelper from '../../helpers/pattern-helper';

export default {
  patternDetails(state) { return state.patternDetails; },
  pattern(state) { return state.pattern; },
  sortedPattern(state) {
    return state.pattern.sort((a, b) => {
      if (a.x === b.x) return a.y > b.y ? 1 : -1;
      return a.x > b.x ? 1 : -1;
    });
  },
  bounds(state) {
    const xPoints = state.pattern.map((point) => point.x);
    const yPoints = state.pattern.map((point) => point.y);
    return {
      xMax: Math.max(...xPoints),
      xMin: Math.min(...xPoints),
      yMax: Math.max(...yPoints),
      yMin: Math.min(...yPoints),
    };
  },
  dimensions(state, getters) {
    return PatternHelper.getDimensionsFromSortedPatten(getters.sortedPattern);
  },
};
