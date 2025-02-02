import PersistanceHelper from '../../helpers/persistance-helper';
import { useSettingsStore } from '../settings/state.js';
import { useKnittingStore } from '../knitting/state.js';
import { usePatternStore } from '../pattern/state.js';

export default {
  patternIndexData() {
    const patternStore = usePatternStore();
    return {
      ...patternStore.patternDetails,
      saveDate: new Date(),
    };
  },
  patternData() {
    const patternStore = usePatternStore();
    return {
      details: patternStore.patternDetails,
      pattern: PersistanceHelper.compressPattern(patternStore.sortedPattern),
    };
  },
  sessionData() {
    const settingsStore = useSettingsStore();
    const knittingStore = useKnittingStore();
    return {
      openPanels: settingsStore.openPanels,
      knitData: knittingStore.knitData,
      settings: settingsStore.settings,
      patternData: this.patternData,
    };
  },
};
