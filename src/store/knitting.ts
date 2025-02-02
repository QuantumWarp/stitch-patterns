import { defineStore } from 'pinia';
import type { KnitData, KnitPattern, KnitSettings, Stitch, StitchInfo } from '../models/knit';
import PatternHelper from '../helpers/pattern-helper';
import { usePatternStore } from './pattern';
import { toRaw } from 'vue';

export const useKnittingStore = defineStore('knitting', {
  state: () => ({
    knitSettings: {
      highlightRow: false,
      fromTop: false,
      fromRight: false,
      reverseEven: true,
      doubleStitch: true,
    },
    time: 0,
    startStitch: null as Stitch | null,
    selectedStitchState: null as Stitch | null,
  }),

  getters: {
    trackedRowCount(): number {
      if (this.time === 0) return 1;
      if (!this.selectedStitchInfo.rowIndex || !this.startStitchInfo.rowIndex) return 1;
      const difference = this.selectedStitchInfo.rowIndex - this.startStitchInfo.rowIndex;
      return difference >= 0 ? difference + 1 : 1;
    },

    knitPattern(): KnitPattern {
      return PatternHelper.applyReducePatternSettings(
        this.defaultKnitPattern,
        this.knitSettings,
      );
    },
    
    defaultKnitPattern() {
      const patternStore = usePatternStore();
      return PatternHelper.reducePattern(patternStore.pattern);
    },
  
    startStitchInfo(): StitchInfo {
      return PatternHelper.createStitchInfo(this.knitPattern, this.startStitch!);
    },
  
    selectedStitch(): Stitch {
      return this.selectedStitchState || this.knitPattern[0][0];
    },

    selectedStitchInfo(): StitchInfo {
      return PatternHelper.createStitchInfo(this.knitPattern, toRaw(this.selectedStitch));
    },
  
    knitData(): KnitData {
      return {
        selectedStitch: {
          rowIndex: this.selectedStitchInfo.rowIndex,
          stitchIndex: this.selectedStitchInfo.stitchIndex,
        },
        startStitch: this.time === 0 ? null : {
          rowIndex: this.startStitchInfo.rowIndex,
          stitchIndex: this.startStitchInfo.stitchIndex,
        },
        time: this.time,
        settings: this.knitSettings,
      };
    },
  },

  actions: {
    updateTime(time: number) {
      if (this.time === 0) {
        this.startStitch = this.selectedStitch;
      }
      this.time = time;
    },

    updateKnitSettings(settingsUpdate: Partial<KnitSettings>) {
      this.knitSettings = { ...this.knitSettings, ...settingsUpdate };
    },

    resetKnitSession({ resetTime } = { resetTime: true }) {
      const firstStitch = this.knitPattern[0][0];
      this.startStitch = firstStitch;
      this.selectedStitchState = firstStitch;
      if (resetTime) {
        this.time = 0;
      }
    },

    selectStitch(stitch: Stitch | null) {
      this.selectedStitchState = stitch;
    },
  }
});
