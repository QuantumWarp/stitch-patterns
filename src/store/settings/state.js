import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  settings: {
    color: '#000000',
    rotate: false,
    mirrorX: false,
    mirrorY: false,
  },
  colorPalette: [],
  openPanels: [],
};

export default {
  actions,
  getters,
  mutations,
  state,
};
