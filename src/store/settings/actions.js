export default {
  updateDrawingSettings({ commit, state }, drawingSettingsUpdate) {
    if (drawingSettingsUpdate.color) {
      commit('addToColorPalette', [drawingSettingsUpdate.color]);
    }

    commit('setDrawingSettings', { ...state.drawingSettings, ...drawingSettingsUpdate });
  },
};
