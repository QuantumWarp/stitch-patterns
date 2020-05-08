export default {
  resetSettings({ commit }) {
    commit('setSettings', {
      color: '#000000',
      rotate: false,
      mirrorX: false,
      mirrorY: false,
    });
    commit('resetColorPalette');
  },
  updateSettings({ commit, state }, settingsUpdate) {
    if (settingsUpdate.color) {
      commit('addToColorPalette', [settingsUpdate.color]);
    }

    commit('setSettings', { ...state.settings, ...settingsUpdate });
  },
};
