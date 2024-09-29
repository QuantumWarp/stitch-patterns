import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

const state = () => ({
  dirty: false,
  patternDetails: {
    name: '',
  },
  pattern: [],
});

export const usePatternStore = defineStore('pattern', {
  actions,
  getters,
  state,
});
