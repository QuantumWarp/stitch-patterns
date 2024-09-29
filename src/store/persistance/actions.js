import FileHelper from '../../helpers/file-helper';
import PersistanceHelper from '../../helpers/persistance-helper';
import PatternHelper from '../../helpers/pattern-helper';
import { useRootStore } from '../store.js';
import { useSettingsStore } from '../settings/state.js';
import { useKnittingStore } from '../knitting/state.js';
import { usePatternStore } from '../pattern/state.js';

export default {
  async importPattern(e) {
    try {
      const patternDataString = await FileHelper.importRaw(e);
      const patternData = JSON.parse(patternDataString);
      this.initialisePatternData(patternData);
      this.savePattern();
    } catch {
       
      console.warn('Import failed');
    }
  },
  initialisePatternData(patternData) {
    const patternStore = usePatternStore();
    const settingsStore = useSettingsStore();

    const pattern = PersistanceHelper.decompressPattern(patternData.pattern);
    const palette = PatternHelper.countColorsForPalette(pattern);
    patternStore.patternDetails = patternData.details;
    patternStore.pattern = pattern;
    settingsStore.resetSettings();
    settingsStore.colorPalette = palette;
    settingsStore.updateSettings({ color: palette[0] });
    patternStore.dirty = false;
  },

  // Overall persistance
  loadIndex() {
    let index = localStorage.getItem('index');
    index = index ? JSON.parse(index) : [];
    this.savedPatterns = index;
  },
  savePattern() {
    const patternStore = usePatternStore();
    const updatedIndex = this.savedPatterns
      .filter((x) => x.name !== this.patternIndexData.name)
      .concat([this.patternIndexData]);
    localStorage.setItem(`pattern: ${this.patternIndexData.name}`, JSON.stringify(this.patternData));
    localStorage.setItem('index', JSON.stringify(updatedIndex));
    this.savedPatterns = updatedIndex;
    patternStore.dirty = false;
  },
  loadPattern(name) {
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    const patternData = JSON.parse(patternDataString);
    this.initialisePatternData(patternData);
  },
  deletePattern(name) {
    const updatedIndex = this.savedPatterns.filter((x) => x.name !== name);
    localStorage.removeItem(`pattern: ${name}`);
    localStorage.setItem('index', JSON.stringify(updatedIndex));
    this.savePatterns = updatedIndex;
  },
  exportKnitPattern() {
    const knittingStore = useKnittingStore();
    const { name } = this.patternDetails;
    const knitString = PersistanceHelper.createKnitString(name, knittingStore.knitPattern);
    FileHelper.download(`${name}.txt`, knitString);
  },
  exportSavedPattern() {
    const { name } = this.patternDetails;
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    FileHelper.download(`${name}.json`, patternDataString);
  },
  exportSavedKnitPattern(name) {
    const patternDataString = localStorage.getItem(`pattern: ${name}`);
    const patternData = JSON.parse(patternDataString);
    const pattern = PersistanceHelper.decompressPattern(patternData.pattern);
    const reducedPattern = PatternHelper.reducePattern(pattern);
    const reducedPatternWithSettings = PatternHelper.applyReducePatternSettings(
      reducedPattern, this.knitSettings,
    );
    const knitString = PersistanceHelper.createKnitString(name, reducedPatternWithSettings);
    FileHelper.download(`${name}.txt`, knitString);
  },

  // Session persistance
  saveSession() {
    localStorage.setItem('session', JSON.stringify(this.sessionData));
  },
  loadSession() {
    const rootStore = useRootStore();
    const settingsStore = useSettingsStore();
    const knittingStore = useKnittingStore();

    const sessionDataString = localStorage.getItem('session');
    if (!sessionDataString) {
      rootStore.reinitialise();
      return;
    }

    const sessionData = JSON.parse(sessionDataString);
    settingsStore.openPanels = sessionData.openPanels;
    settingsStore.settings = sessionData.settings;
    this.initialisePatternData(sessionData.patternData);
    knittingStore.knitSettings = sessionData.knitData.settings;
    knittingStore.time = sessionData.knitData.time;
    setTimeout(() => {
      knittingStore.selectedStitchState = knittingStore.knitPattern[sessionData.knitData.selectedStitch.rowIndex][sessionData.knitData.selectedStitch.stitchIndex];
      if (sessionData.knitData.startStitch) {
        knittingStore.startStitch = knittingStore.knitPattern[sessionData.knitData.startStitch.rowIndex][sessionData.knitData.startStitch.stitchIndex];
      }
    });
  },
};
