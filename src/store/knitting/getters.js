import PatternHelper from '../../helpers/pattern-helper';

export default {
  knitSettings(state) { return state.knitSettings; },
  time(state) { return state.time; },
  trackedRowCount(state, getters) {
    if (getters.time === 0) return 1;
    const difference = getters.selectedStitchInfo.rowIndex - getters.startStitchInfo.rowIndex;
    return difference >= 0 ? difference + 1 : 1;
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

  startStitch(state) { return state.startStitch; },
  startStitchInfo(state, getters) {
    return PatternHelper.createStitchInfo(getters.knitPattern, getters.startStitch);
  },

  selectedStitch(state, getters) {
    return state.selectedStitch || getters.knitPattern[0][0];
  },
  selectedStitchInfo(state, getters) {
    return PatternHelper.createStitchInfo(getters.knitPattern, getters.selectedStitch);
  },

  knitData(state, getters) {
    return {
      selectedStitch: {
        rowIndex: getters.selectedStitchInfo.rowIndex,
        stitchIndex: getters.selectedStitchInfo.stitchIndex,
      },
      startStitch: getters.time === 0 ? null : {
        rowIndex: getters.startStitchInfo.rowIndex,
        stitchIndex: getters.startStitchInfo.stitchIndex,
      },
      time: getters.time,
      settings: getters.knitSettings,
    };
  },
};
