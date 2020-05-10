import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  knitSettings: {
    fromTop: false,
    fromRight: false,
    reverseOdd: true,
    doubleStitch: true,
  },
  time: 0,
  selectedStitch: null,
};

export default {
  actions,
  getters,
  mutations,
  state,
};
