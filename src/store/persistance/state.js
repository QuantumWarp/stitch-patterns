import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

const state = () => ({
  savedPatterns: [],
});

export const usePersistanceStore = defineStore('persistance', {
  actions,
  getters,
  state,
});
