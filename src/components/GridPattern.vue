<template>
  <div
    :class="{ readonly: isKnitting }"
    class="grid-pattern"
  >
    <div
      class="render-area"
      :style="gridStyle"
    >
      <div
        v-if="isKnitting && knitSettings.highlightRow"
        class="selected-row-overlay"
        :style="selectedRowStyle"
      />

      <div
        v-for="point in pattern"
        :key="`${point.x}-${point.y}`"
        class="grid-square"
        :style="getPointStyle(point)"
        @mousedown="colorPoint($event, point)"
        @mouseover="colorPoint($event, point)"
      />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { usePatternStore } from '@/store/pattern/state';
import { useSettingsStore } from '@/store/settings/state';
import { useKnittingStore } from '@/store/knitting/state';

export default {
  setup() {
    const patternStore = usePatternStore();
    const { pattern, bounds, dimensions } = storeToRefs(patternStore);
    const { updatePointColor } = patternStore;

    const settingsStore = useSettingsStore();
    const { settings, openPanels } = storeToRefs(settingsStore);

    const knittingStore = useKnittingStore();
    const { knitSettings, selectedStitchInfo } = storeToRefs(knittingStore);

    return {
      pattern,
      bounds,
      dimensions,
      settings,
      openPanels,
      knitSettings,
      selectedStitchInfo,
      updatePointColor,
    };
  },
  data: () => ({
    mouseDown: false,
    squareDimensions: { width: 25, height: 20 },
  }),
  computed: {
    gridStyle() {
      return {
        top: `${this.squareDimensions.height * -this.bounds.yMin}px`,
        left: `${this.squareDimensions.width * -this.bounds.xMin}px`,
        transform: this.settings.rotate
          ? `rotate(90deg)
            translateX(${(this.squareDimensions.height * this.bounds.yMin) - (this.squareDimensions.width * this.bounds.xMin)}px)
            translateY(${(this.squareDimensions.width * -this.bounds.xMin) - (this.squareDimensions.height * (this.dimensions.height + this.bounds.yMin))}px)`
          : 'none',
      };
    },
    selectedRowStyle() {
      const index = this.knitSettings.fromTop
        ? this.selectedStitchInfo.rowIndex
        : this.dimensions.height - this.selectedStitchInfo.rowIndex + this.bounds.yMin - 1;
      return {
        top: `${this.squareDimensions.height * index}px`,
        left: `${this.squareDimensions.width * this.bounds.xMin}px`,
        height: `${this.squareDimensions.height + 1}px`,
        width: `${this.squareDimensions.width * this.dimensions.width + 2}px`,
      };
    },
    isKnitting() {
      return this.openPanels.includes('knitting');
    },
  },
  methods: {
    getPointStyle(point) {
      return {
        backgroundColor: point.color,
        top: `${this.squareDimensions.height * point.y}px`,
        height: `${this.squareDimensions.height}px`,
        left: `${this.squareDimensions.width * point.x}px`,
        width: `${this.squareDimensions.width}px`,
      };
    },
    colorPoint(e, point) {
      if (e.buttons !== 1) return;

      this.updatePointColor(point);

      let mirrorPointX = null;
      if (this.settings.mirrorX) {
        mirrorPointX = this.dimensions.width - (point.x + 1);
        const mirrorPoint = this.pattern.find((p) => p.x === mirrorPointX && p.y === point.y);
        this.updatePointColor(mirrorPoint);
      }

      let mirrorPointY = null;
      if (this.settings.mirrorY) {
        mirrorPointY = this.dimensions.height - (point.y + 1);
        const mirrorPoint = this.pattern.find((p) => p.x === point.x && p.y === mirrorPointY);
        this.updatePointColor(mirrorPoint);
      }

      if (mirrorPointX !== null && mirrorPointY !== null) {
        const mirrorPoint = this.pattern.find((p) => p.x === mirrorPointX && p.y === mirrorPointY);
        this.updatePointColor(mirrorPoint);
      }
    },
  },
};
</script>

<style scoped>
.grid-pattern {
  position: relative;
  width: 100%;
  height: 100%;
}

.grid-pattern.readonly {
  cursor: not-allowed;
}

.render-area {
  position: absolute;
}

.grid-pattern.readonly>.render-area {
  pointer-events: none;
}

.grid-square {
  position: absolute;
  border: 1px solid grey;
  user-select: none;
}

.selected-row-overlay {
  position: absolute;
  z-index: 1;
  box-shadow: 0px 0px 120px 50px #bbb;
}
</style>
