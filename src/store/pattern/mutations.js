/* eslint-disable no-param-reassign */
export default {
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
