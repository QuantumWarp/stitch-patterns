import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  pattern: [],
  dimensions: {},
  drawingSettings: {
    color: '#000000',
    mirrorX: false,
    mirrorY: false,
  },
  colorPalette: [
    '#000000',
    '#FFFFFF',
  ],
};

const actions = {
  updateDrawingSettings({ commit, state }, drawingSettingsUpdate) {
    if (drawingSettingsUpdate.color) {
      commit('addToColorPalette', [drawingSettingsUpdate.color]);
    }

    commit('setDrawingSettings', Object.assign(state.drawingSettings, drawingSettingsUpdate));
  },
  updatePattern({ commit }, pattern) {
    const height = Math.max(...pattern.map((point) => point.y)) + 1;
    const width = Math.max(...pattern.map((point) => point.x)) + 1;
    commit('setPattern', { pattern, width, height })
  },
  resetPattern({ commit }, patternSettings) {
    if (patternSettings.width > 100) patternSettings.width = 100;
    if (patternSettings.height > 100) patternSettings.height = 100;
    if (patternSettings.width < 1) patternSettings.width = 30;
    if (patternSettings.height < 1) patternSettings.height = 30;

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
  addToColorPalette(state, colors) {
    state.colorPalette = colors
      .concat(state.colorPalette)
      .filter((val, index, self) => self.indexOf(val) === index)
      .slice(0, 10);
  },
};

const getters = {
  colorPalette(state) { return state.colorPalette; },
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
