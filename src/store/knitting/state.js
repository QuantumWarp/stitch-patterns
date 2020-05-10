import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  knitSettings: {
    fromTop: false,
    fromRight: false,
    reverseEven: true,
    doubleStitch: true,
  },
  time: 0,
  startStitch: 0,
  selectedStitch: null,
};

export default {
  actions,
  getters,
  mutations,
  state,
};
