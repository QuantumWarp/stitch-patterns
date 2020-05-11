import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  dirty: false,
  patternDetails: {
    name: '',
  },
  pattern: [],
};

export default {
  actions,
  getters,
  mutations,
  state,
};
