import { defineStore } from 'pinia';
import type { Settings } from '../models/settings';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      color: '#000000',
      rotate: false,
      mirrorX: false,
      mirrorY: false,
    } as Settings,
    colorPalette: [] as string[],
    openPanels: [] as string[],
  }),

  actions: {
    updatePanelState({ panel, open }: { panel: string, open: boolean }) {
      const newPanels = open ? [panel] : [];
      this.openPanels = newPanels;
    },

    resetSettings() {
      this.settings = {
        color: '#000000',
        rotate: false,
        mirrorX: false,
        mirrorY: false,
      }
      this.colorPalette = [
        '#000000',
        '#ffffff',
      ];
    },

    updateSettings(settingsUpdate: Partial<Settings>) {
      if (settingsUpdate.color) {
        this.colorPalette = [settingsUpdate.color]
          .concat(this.colorPalette)
          .filter((val, index, self) => self.indexOf(val) === index)
          .slice(0, 10);
      }
  
      this.settings = { ...this.settings, ...settingsUpdate };
    },
  }
});
