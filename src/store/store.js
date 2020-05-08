import Vue from 'vue';
import Vuex from 'vuex';

import patternStore from './pattern/state';
import persistanceStore from './persistance/state';
import settingsStore from './settings/state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pattern: patternStore,
    persistance: persistanceStore,
    settings: settingsStore,
  },
});
