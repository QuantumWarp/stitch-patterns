import FileHelper from '../../helpers/file-helper';
import PersistanceHelper from '../../helpers/persistance-helper';
import PatternHelper from '../../helpers/pattern-helper';

let saveSessionTimeout;

export default {
  downloadPattern(context, name) {
    const sessionDataString = localStorage.getItem(`pattern: ${name}`);
    FileHelper.download(`${name}.json`, sessionDataString);
  },
  async importPattern({ dispatch }, e) {
    const sessionDataString = await FileHelper.importRaw(e);
    dispatch('initialiseFromSessionData', sessionDataString);
    dispatch('savePattern');
  },
  initialiseFromSessionData({ commit, dispatch }, sessionDataString) {
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);

      try {
        const pattern = PersistanceHelper.decompressPattern(sessionData.pattern);
        const palette = PatternHelper.countColorsForPalette(pattern);
        commit('setPatternDetails', sessionData.details);
        commit('setPattern', pattern);
        dispatch('resetSettings');
        commit('setColorPalette', palette);
        dispatch('saveSessionDebounce');
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Failed loading session state');
      }
    }

    dispatch('reinitialise');
  },

  // Overall persistance
  loadIndex({ commit }) {
    let index = localStorage.getItem('index');
    index = index ? JSON.parse(index) : [];
    commit('setSavedPatterns', index);
  },
  savePattern({ commit, getters }) {
    const indexData = PersistanceHelper.createIndexInfo(getters.patternDetails);
    const updatedIndex = getters.savedPatterns
      .filter((x) => x.name !== indexData.name)
      .concat([indexData]);
    commit('setSavedPatterns', updatedIndex);
    localStorage.setItem(`pattern: ${indexData.name}`, JSON.stringify(getters.sessionData));
    localStorage.setItem('index', JSON.stringify(updatedIndex));
  },
  loadPattern({ dispatch }, name) {
    const sessionDataString = localStorage.getItem(`pattern: ${name}`);
    dispatch('initialiseFromSessionData', sessionDataString);
  },
  deletePattern({ commit, getters }, name) {
    localStorage.removeItem(`pattern: ${name}`);
    commit('setSavedPatterns', getters.savedPatterns.filter((x) => x.name !== name));
  },

  // Session persistance
  saveSessionDebounce({ dispatch }) {
    clearTimeout(saveSessionTimeout);
    saveSessionTimeout = setTimeout(() => dispatch('saveSession'), 500);
  },
  saveSession({ getters }) {
    localStorage.setItem('session', JSON.stringify(getters.sessionData));
  },
  loadSession({ dispatch }) {
    const sessionDataString = localStorage.getItem('session');
    dispatch('initialiseFromSessionData', sessionDataString);
  },
};
