import PatternHelper from '../../helpers/pattern-helper';
import { usePatternStore } from '../pattern/state.js';

export default {
  trackedRowCount() {
    if (this.time === 0) return 1;
    const difference = this.selectedStitchInfo.rowIndex - this.startStitchInfo.rowIndex;
    return difference >= 0 ? difference + 1 : 1;
  },
  knitPattern() {
    return PatternHelper.applyReducePatternSettings(
      this.defaultKnitPattern,
      this.knitSettings,
    );
  },
  defaultKnitPattern() {
    const patternStore = usePatternStore();
    return PatternHelper.reducePattern(patternStore.pattern);
  },

  startStitchInfo() {
    return PatternHelper.createStitchInfo(this.knitPattern, this.startStitch);
  },

  selectedStitch() {
    return this.selectedStitchState || this.knitPattern[0][0];
  },
  selectedStitchInfo() {
    return PatternHelper.createStitchInfo(this.knitPattern, this.selectedStitch);
  },

  knitData() {
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
};
