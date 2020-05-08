export default {
  updateSettings({ commit, state }, settingsUpdate) {
    if (settingsUpdate.color) {
      commit('addToColorPalette', [settingsUpdate.color]);
    }

    commit('setSettings', { ...state.settings, ...settingsUpdate });
  },
};
