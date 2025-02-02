import { defineStore } from 'pinia';

import PatternHelper from '@/helpers/pattern-helper';

import { usePatternStore } from './pattern/state';
import { useSettingsStore } from './settings/state';

const actions = {
  reinitialise() {
    const patternStore = usePatternStore();
    const settingsStore = useSettingsStore();

    const pattern = PatternHelper.createFilledPattern({ height: 30, width: 30 }, '#ffffff');
    settingsStore.resetSettings();
    patternStore.updatePatternDetails({ name: 'New Pattern' });
    patternStore.updatePattern(pattern);
    settingsStore.updatePanelState({ panel: 'color', open: true });
  },
};

export const useRootStore = defineStore('root', {
  actions,
});
