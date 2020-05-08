/* eslint-disable no-param-reassign */
export default {
  setPatternDetails(state, patternDetails) {
    state.patternDetails = patternDetails;
  },
  setPattern(state, pattern) {
    state.pattern = pattern;
  },
  updatePoint(state, { x, y, color }) {
    const foundPoint = state.pattern.find(
      (point) => point.x === x && point.y === y,
    );
    foundPoint.color = color;
  },
};
