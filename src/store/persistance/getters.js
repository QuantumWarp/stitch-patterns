import PersistanceHelper from '../../helpers/persistance-helper';

export default {
  savedPatterns(state) { return state.savedPatterns; },
  patternIndexData(state, getters) {
    return {
      ...getters.patternDetails,
      saveDate: new Date(),
    };
  },
  patternData(state, getters) {
    return {
      details: getters.patternDetails,
      pattern: PersistanceHelper.compressPattern(getters.sortedPattern),
    };
  },
  sessionData(state, getters) {
    return {
      openPanels: getters.openPanels,
      knitData: getters.knitData,
      settings: getters.settings,
      patternData: getters.patternData,
    };
  },
};
