import Vue from 'vue';
import Vuex from 'vuex';

import patternStore from './pattern/state';
import persistanceStore from './persistance/state';
import settingsStore from './settings/state';

Vue.use(Vuex);

const actions = {
  reinitialise({ dispatch }) {
    const pattern = [];
    for (let x = 0; x < 30; x += 1) {
      for (let y = 0; y < 30; y += 1) {
        pattern.push({ x, y, color: '#ffffff' });
      }
    }
    dispatch('resetSettings');
    dispatch('updatePatternDetails', { name: 'New Pattern' });
    dispatch('updatePattern', pattern);
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    pattern: patternStore,
    persistance: persistanceStore,
    settings: settingsStore,
  },
});
