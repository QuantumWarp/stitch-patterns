import PatternHelper from '../../helpers/pattern-helper';

export default {
  knitSettings(state) { return state.knitSettings; },
  time(state) { return state.time; },
  knitPattern(state, getters) {
    return PatternHelper.applyReducePatternSettings(getters.defaultKnitPattern);
  },
  selectedStitch(state) { return state.selectedStitch; },
  selectedRow(state, getters) {
    return getters.knitPattern.find(
      (row) => Boolean(row.find(
        (stitch) => stitch === getters.selectedStitch,
      )),
    );
  },
  defaultKnitPattern(state, getters) {
    return PatternHelper.reducePattern(getters.pattern);
  },
};
