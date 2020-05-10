import Vue from 'vue';
import Vuex from 'vuex';

import knittingStore from './knitting/state';
import patternStore from './pattern/state';
import persistanceStore from './persistance/state';
import settingsStore from './settings/state';
import PatternHelper from '../helpers/pattern-helper';

Vue.use(Vuex);

const actions = {
  reinitialise({ dispatch }) {
    const pattern = PatternHelper.createFilledPattern({ height: 30, width: 30 }, '#ffffff');
    dispatch('resetSettings');
    dispatch('updatePatternDetails', { name: 'New Pattern' });
    dispatch('updatePattern', pattern);
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    knitting: knittingStore,
    pattern: patternStore,
    persistance: persistanceStore,
    settings: settingsStore,
  },
});
