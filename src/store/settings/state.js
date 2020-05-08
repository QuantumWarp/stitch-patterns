import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  drawingSettings: {
    color: '#000000',
    rotate: false,
    mirrorX: false,
    mirrorY: false,
  },
  colorPalette: [
    '#000000',
    '#ffffff',
  ],
};

export default {
  actions,
  getters,
  mutations,
  state,
};
