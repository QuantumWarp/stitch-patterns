import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  pattern: [],
  dimensions: {},
  drawingSettings: {
    color: '#000000',
    previousColor: '#FFFFFF',
    mirrorX: false,
    mirrorY: false,
  },
};

const actions = {
  togglePreviousColor({ commit, state }) {
    commit('setDrawingSettings', {
      ...state.drawingSettings,
      color: state.drawingSettings.previousColor,
      previousColor: state.drawingSettings.color,
    });
  },
  updateDrawingSettings({ commit, state }, drawingSettingsUpdate) {
    commit('setDrawingSettings', Object.assign(state.drawingSettings, drawingSettingsUpdate));
  },
  updatePattern({ commit }, pattern) {
    const height = Math.max(...pattern.map((point) => point.y)) + 1;
    const width = Math.max(...pattern.map((point) => point.x)) + 1;
    commit('setPattern', { pattern, width, height })
  },
  resetPattern({ commit }, patternSettings) {
    const pattern = [];
    for (let x = 0; x < patternSettings.width; x++) {
      for (let y = 0; y < patternSettings.height; y++) {
        pattern.push({
          x: x,
          y: y,
          color: patternSettings.refreshColor,
        });
      }
    }
    commit('setPattern', { pattern, width: patternSettings.width, height: patternSettings.height })
  },
};

const mutations = {
  setPattern(state, { pattern, height, width }) {
    state.pattern = pattern;
    state.dimensions = { height, width };
  },
  setDrawingSettings(state, drawingSettings) {
    drawingSettings.previousColor = state.drawingSettings.color;
    state.drawingSettings = drawingSettings;
  },
};

const getters = {
  drawingSettings(state) { return state.drawingSettings; },
  pattern(state) { return state.pattern; },
  dimensions(state) { return state.dimensions; },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
