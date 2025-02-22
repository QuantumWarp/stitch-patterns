import { defineStore } from 'pinia';
import type { CompressedPattern, PatternDetails } from '../models/pattern';
import { usePatternStore } from '../bin/pattern';
import PersistanceHelper from '../helpers/persistance-helper';
import { useSettingsStore } from '../bin/settings';
import { useKnittingStore } from './knitting';
import FileHelper from '../helpers/file-helper';
import PatternHelper from '../helpers/pattern-helper';
import { useRootStore } from './store';

export const usePersistanceStore = defineStore('persistance', {
  state: () => ({
    savedPatterns: [] as PatternDetails[],
  }),

  getters: {
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
        knitData: knittingStore.knitData,
        settings: settingsStore.settings,
        patternData: this.patternData,
      };
    },
  },

  actions: {
    async importPattern(e: InputEvent) {
      try {
        const patternDataString = await FileHelper.importRaw(e) as string;
        const patternData = JSON.parse(patternDataString);
        this.initialisePatternData(patternData);
        this.savePattern();
      } catch {
         
        console.warn('Import failed');
      }
    },

    initialisePatternData(patternData: { details: PatternDetails, pattern: CompressedPattern }) {
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
      const index = localStorage.getItem('index');
      const patterns = index ? JSON.parse(index) : [];
      this.savedPatterns = patterns;
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

    deletePattern(name: string) {
      const updatedIndex = this.savedPatterns.filter((x) => x.name !== name);
      localStorage.removeItem(`pattern: ${name}`);
      localStorage.setItem('index', JSON.stringify(updatedIndex));
      this.savedPatterns = updatedIndex;
    },

    exportKnitPattern() {
      const knittingStore = useKnittingStore();
      const patternStore = usePatternStore();
      const { name } = patternStore.patternDetails;
      const knitString = PersistanceHelper.createKnitString(name, knittingStore.knitPattern);
      FileHelper.download(`${name}.txt`, knitString);
    },

    exportSavedPattern() {
      const patternStore = usePatternStore();
      const { name } = patternStore.patternDetails;
      const patternDataString = localStorage.getItem(`pattern: ${name}`)!;
      FileHelper.download(`${name}.json`, patternDataString);
    },

    exportSavedKnitPattern(name: string) {
      const knittingStore = useKnittingStore();
      const patternDataString = localStorage.getItem(`pattern: ${name}`)!;
      const patternData = JSON.parse(patternDataString);
      const pattern = PersistanceHelper.decompressPattern(patternData.pattern);
      const reducedPattern = PatternHelper.reducePattern(pattern);
      const reducedPatternWithSettings = PatternHelper.applyReducePatternSettings(
        reducedPattern, knittingStore.knitSettings,
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
  }
});
