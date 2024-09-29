import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

const state = () => ({
  knitSettings: {
    highlightRow: false,
    fromTop: false,
    fromRight: false,
    reverseEven: true,
    doubleStitch: true,
  },
  time: 0,
  startStitch: null,
  selectedStitchState: null,
});

export const useKnittingStore = defineStore('knitting', {
  actions,
  getters,
  state,
});
