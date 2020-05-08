export default {
  patternDetails(state) { return state.patternDetails; },
  pattern(state) { return state.pattern; },
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
    return {
      height: getters.bounds.yMax - getters.bounds.yMin + 1,
      width: getters.bounds.xMax - getters.bounds.xMin + 1,
    };
  },
};
