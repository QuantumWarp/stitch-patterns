import { defineStore } from 'pinia';
import actions from './actions';

const state = () => ({
  settings: {
    color: '#000000',
    rotate: false,
    mirrorX: false,
    mirrorY: false,
  },
  colorPalette: [],
  openPanels: [],
});

export const useSettingsStore = defineStore('settings', {
  actions,
  state,
});
