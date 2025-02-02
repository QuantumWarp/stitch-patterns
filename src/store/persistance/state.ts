import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';
import type { Pattern } from '../../models/pattern';

const state = () => ({
  savedPatterns: [] as Pattern[],
});

export const usePersistanceStore = defineStore('persistance', {
  actions,
  getters,
  state,
});
