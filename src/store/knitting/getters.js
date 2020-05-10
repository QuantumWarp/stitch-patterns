import PatternHelper from '../../helpers/pattern-helper';

export default {
  knitSettings(state) { return state.knitSettings; },
  time(state) { return state.time; },
  trackedRowCount(state, getters) {
    if (getters.time === 0) return 0;
    const startRow = getters.knitPattern.find(
      (row) => Boolean(row.find(
        (stitch) => stitch === state.startStitch,
      )),
    );
    const startRowIndex = getters.knitPattern.indexOf(startRow);
    const difference = getters.rowIndex - startRowIndex;
    return difference >= 0 ? difference : 0;
  },
  knitPattern(state, getters) {
    return PatternHelper.applyReducePatternSettings(
      getters.defaultKnitPattern,
      getters.knitSettings,
    );
  },
  defaultKnitPattern(state, getters) {
    return PatternHelper.reducePattern(getters.pattern);
  },

  // Selected stitch
  selectedStitch(state) { return state.selectedStitch; },
  selectedRow(state, getters) {
    return getters.knitPattern.find(
      (row) => Boolean(row.find(
        (stitch) => stitch === getters.selectedStitch,
      )),
    );
  },
  stitchIndex(state, getters) { return getters.selectedRow.indexOf(getters.selectedStitch); },
  isStartStitch(state, getters) { return getters.stitchIndex === 0; },
  isEndStitch(state, getters) { return getters.stitchIndex === getters.selectedRow.length - 1; },
  rowIndex(state, getters) { return getters.knitPattern.indexOf(getters.selectedRow); },
  isStartRow(state, getters) { return getters.rowIndex === 0; },
  isEndRow(state, getters) { return getters.rowIndex === getters.knitPattern.length - 1; },
};
