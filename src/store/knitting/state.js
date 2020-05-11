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
  startStitch: null,
  selectedStitch: null,
};

export default {
  actions,
  getters,
  mutations,
  state,
};
