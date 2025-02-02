import { defineStore } from 'pinia';
import actions from './actions';

const state = () => ({
  settings: {
    color: '#000000',
    rotate: false,
    mirrorX: false,
    mirrorY: false,
  },
  colorPalette: [] as string[],
  openPanels: [] as string[],
});

export const useSettingsStore = defineStore('settings', {
  actions,
  state,
});
