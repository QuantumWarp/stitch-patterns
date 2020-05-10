export default {
  updateTime({ commit, getters }, time) {
    if (getters.time === 0) {
      commit('setStartStitch', getters.selectedStitch);
    }
    commit('setTime', time);
  },
  updateKnitSettings({ commit, state }, settingsUpdate) {
    commit('setKnitSettings', { ...state.knitSettings, ...settingsUpdate });
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
