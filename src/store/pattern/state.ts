import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';
import type { GridSquares } from '../../models/grid';

const state = () => ({
  dirty: false,
  patternDetails: {
    name: '',
  },
  pattern: [] as GridSquares,
});

export const usePatternStore = defineStore('pattern', {
  actions,
  getters,
  state,
});
