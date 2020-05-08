import persistanceHelper from '../../helpers/persistance-helper';

let saveSessionTimeout;

export default {
  download() {

  },
  import() {

  },
  initialise() {

  },
  save() {

  },
  load() {

  },
  delete() {

  },

  saveSessionDebounce({ dispatch }) {
    clearTimeout(saveSessionTimeout);
    saveSessionTimeout = setTimeout(() => dispatch('saveSession'), 500);
  },
  // Save and load session
  saveSession({ getters }) {
    const sessionData = {
      metadata: {
        ...getters.patternDetails,
        saveDate: new Date(),
      },
      compressedPattern: persistanceHelper.compressPattern(getters.pattern),
    };
    localStorage.setItem('session', JSON.stringify(sessionData));
  },
  loadSession({ commit, dispatch }) {
    const sessionDataString = localStorage.getItem('session');
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
      if (sessionData.compressedPattern) {
        try {
          commit('setPatternDetails', { name: sessionData.metadata.name });
          commit('setPattern', sessionData.compressedPattern);
          dispatch('resetSettings');
          return;
        } catch {
          // eslint-disable-next-line no-console
          console.warn('Failed loading session state');
        }
      }
    }

    dispatch('reinitialise');
  },
};
