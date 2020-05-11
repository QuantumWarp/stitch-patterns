import FileHelper from '../../helpers/file-helper';
import PersistanceHelper from '../../helpers/persistance-helper';
import PatternHelper from '../../helpers/pattern-helper';

export default {
  async importPattern({ dispatch }, e) {
    try {
      const patternDataString = await FileHelper.importRaw(e);
      const patternData = JSON.parse(patternDataString);
      dispatch('initialisePatternData', patternData);
      dispatch('savePattern');
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Import failed');
    }
  },
  initialisePatternData({ commit, dispatch }, patternData) {
    const pattern = PersistanceHelper.decompressPattern(patternData.pattern);
    const palette = PatternHelper.countColorsForPalette(pattern);
    commit('setPatternDetails', patternData.details);
    commit('setPattern', pattern);
    dispatch('resetSettings');
    commit('setColorPalette', palette);
    dispatch('updateSettings', { color: palette[0] });
  },

  // Overall persistance
  loadIndex({ commit }) {
    let index = localStorage.getItem('index');
    index = index ? JSON.parse(index) : [];
    commit('setSavedPatterns', index);
  },
  savePattern({ commit, getters }) {
    const updatedIndex = getters.savedPatterns
      .filter((x) => x.name !== getters.patternIndexData.name)
      .concat([getters.patternIndexData]);
    localStorage.setItem(`pattern: ${getters.patternIndexData.name}`, JSON.stringify(getters.patternData));
    localStorage.setItem('index', JSON.stringify(updatedIndex));
    commit('setSavedPatterns', updatedIndex);
  },
  loadPattern({ dispatch }, name) {
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    const patternData = JSON.parse(patternDataString);
    dispatch('initialisePatternData', patternData);
  },
  deletePattern({ commit, getters }, name) {
    const updatedIndex = getters.savedPatterns.filter((x) => x.name !== name);
    localStorage.removeItem(`pattern: ${name}`);
    localStorage.setItem('index', JSON.stringify(updatedIndex));
    commit('setSavedPatterns', updatedIndex);
  },
  exportKnitPattern({ getters }) {
    const { name } = getters.patternDetails;
    const knitString = PersistanceHelper.createKnitString(name, getters.knitPattern);
    FileHelper.download(`${name}.txt`, knitString);
  },
  exportSavedPattern({ getters }) {
    const { name } = getters.patternDetails;
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    FileHelper.download(`${name}.json`, patternDataString);
  },
  exportSavedKnitPattern({ getters }, name) {
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    const patternData = JSON.parse(patternDataString);
    const pattern = PersistanceHelper.decompressPattern(patternData.pattern);
    const reducedPattern = PatternHelper.reducePattern(pattern);
    const reducedPatternWithSettings = PatternHelper.applyReducePatternSettings(
      reducedPattern, getters.knitSettings,
    );
    const knitString = PersistanceHelper.createKnitString(name, reducedPatternWithSettings);
    FileHelper.download(`${name}.txt`, knitString);
  },

  // Session persistance
  saveSession({ getters }) {
    localStorage.setItem('session', JSON.stringify(getters.sessionData));
  },
  loadSession({ commit, dispatch, getters }) {
    const sessionDataString = localStorage.getItem('session');
    if (!sessionDataString) {
      dispatch('reinitialise');
      return;
    }

    const sessionData = JSON.parse(sessionDataString);
    commit('setOpenPanels', sessionData.openPanels);
    commit('setSettings', sessionData.settings);
    dispatch('initialisePatternData', sessionData.patternData);
    commit('setKnitSettings', sessionData.knitData.settings);
    commit('setTime', sessionData.knitData.time);
    setTimeout(() => {
      commit('setSelectedStitch', getters.knitPattern[sessionData.knitData.selectedStitch.rowIndex][sessionData.knitData.selectedStitch.stitchIndex]);
      if (sessionData.knitData.startStitch) {
        commit('setStartStitch', getters.knitPattern[sessionData.knitData.startStitch.rowIndex][sessionData.knitData.startStitch.stitchIndex]);
      }
    });
  },
};
