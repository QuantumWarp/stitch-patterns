export default {
  updatePanelState({ commit, getters }, { panel, open }) {
    const panelOpen = getters.openPanels.includes(panel);
    if (open) {
      commit('setOpenPanels', [panel]);
      return;
    }
    if (panelOpen === open) return;
    const newPanels = open
      ? [...getters.openPanels, panel]
      : getters.openPanels.filter((x) => x !== panel);
    commit('setOpenPanels', newPanels);
  },
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
