/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  pattern: [],
  dimensions: {},
  drawingSettings: {
    color: '#000000',
    rotate: false,
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

    commit('setDrawingSettings', { ...state.drawingSettings, ...drawingSettingsUpdate });
  },
  updatePattern({ commit }, pattern) {
    commit('setPattern', pattern);
  },
  resetPattern({ commit }, patternSettings) {
    if (patternSettings.width > 100) patternSettings.width = 100;
    if (patternSettings.height > 100) patternSettings.height = 100;
    if (patternSettings.width < 1) patternSettings.width = 30;
    if (patternSettings.height < 1) patternSettings.height = 30;

    const pattern = [];
    for (let x = 0; x < patternSettings.width; x += 1) {
      for (let y = 0; y < patternSettings.height; y += 1) {
        pattern.push({
          x,
          y,
          color: patternSettings.refreshColor,
        });
      }
    }
    commit('setPattern', pattern);
  },
  adjustDimensions({ commit, getters }, { side, op }) {
    let newPattern;

    if (op === 'add') {
      let additions = [];

      switch (side) {
        case 'left':
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({ x: getters.bounds.xMin - 1, y: getters.bounds.yMin + index }));
          break;
        case 'right':
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({ x: getters.bounds.xMax + 1, y: getters.bounds.yMin + index }));
          break;
        case 'top':
          additions.length = getters.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({ x: getters.bounds.xMin + index, y: getters.bounds.yMin - 1 }));
          break;
        case 'bottom':
          additions.length = getters.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({ x: getters.bounds.xMin + index, y: getters.bounds.yMax + 1 }));
          break;
      }
      additions.forEach((point) => { point.color = getters.drawingSettings.color; });
      newPattern = getters.pattern.concat(additions);
    } else if (op === 'remove') {
      switch (side) {
        case 'left':
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMin);
          break;
        case 'right':
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMax);
          break;
        case 'top':
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMin);
          break;
        case 'bottom':
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMax);
          break;
      }
    }
    commit('setPattern', newPattern);
  },
};

const mutations = {
  setPattern(state, pattern) {
    state.pattern = pattern;
  },
  setDrawingSettings(state, drawingSettings) {
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
  bounds(state) {
    const xPoints = state.pattern.map((point) => point.x);
    const yPoints = state.pattern.map((point) => point.y);
    return {
      xMax: Math.max(...xPoints),
      xMin: Math.min(...xPoints),
      yMax: Math.max(...yPoints),
      yMin: Math.min(...yPoints),
    };
  },
  dimensions(state, getters) {
    return {
      height: getters.bounds.yMax - getters.bounds.yMin + 1,
      width: getters.bounds.xMax - getters.bounds.xMin + 1,
    };
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
