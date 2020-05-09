import PersistanceHelper from '../../helpers/persistance-helper';

export default {
  savedPatterns(state) { return state.savedPatterns; },
  sessionData(state, getters) {
    return PersistanceHelper.createSessionData(
      getters.patternDetails,
      getters.sortedPattern,
    );
  },
};
