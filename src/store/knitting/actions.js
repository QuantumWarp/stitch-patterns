export default {
  updateTime() {

  },
  updateKnitSettings({ commit, state }, settingsUpdate) {
    commit('setSettings', { ...state.knitSettings, ...settingsUpdate });
  },
  resetKnitSession({ commit, getters }) {
    const firstStitch = getters.knitPattern[0][0];
    commit('setSelectedStitch', firstStitch);
  },
  selectStitch({ commit }, stitch) {
    commit('setSelectedStitch', stitch);
  },
  exportToKnit() {

  },
};
