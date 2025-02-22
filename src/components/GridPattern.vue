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

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePatternStore } from '@/bin/pattern.ts';
import { useSettingsStore } from '@/bin/settings.ts';
import { useKnittingStore } from '@/store/knitting';
import { computed, ref } from 'vue';
import type { Square } from '../models/grid.ts';

defineProps<{ isKnitting?: boolean }>();

const patternStore = usePatternStore();
const { pattern, bounds, dimensions } = storeToRefs(patternStore);
const { updatePointColor } = patternStore;

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);

const knittingStore = useKnittingStore();
const { knitSettings, selectedStitchInfo } = storeToRefs(knittingStore);

const squareDimensions = ref({ width: 25, height: 20 });

const gridStyle = computed(() => {
  return {
    top: `${squareDimensions.value.height * -bounds.value.yMin}px`,
    left: `${squareDimensions.value.width * -bounds.value.xMin}px`,
    transform: settings.value.rotate
      ? `rotate(90deg)
        translateX(${(squareDimensions.value.height * bounds.value.yMin) - (squareDimensions.value.width * bounds.value.xMin)}px)
        translateY(${(squareDimensions.value.width * -bounds.value.xMin) - (squareDimensions.value.height * (dimensions.value.height + bounds.value.yMin))}px)`
      : 'none',
  };
});

const selectedRowStyle = computed(() => {
  const index = knitSettings.value.fromTop
    ? selectedStitchInfo.value.rowIndex
    : dimensions.value.height - selectedStitchInfo.value.rowIndex + bounds.value.yMin - 1;
  return {
    top: `${squareDimensions.value.height * index}px`,
    left: `${squareDimensions.value.width * bounds.value.xMin}px`,
    height: `${squareDimensions.value.height + 1}px`,
    width: `${squareDimensions.value.width * dimensions.value.width + 2}px`,
  };
});

const getPointStyle = (point: Square) => {
  return {
    backgroundColor: point.color,
    top: `${squareDimensions.value.height * point.y}px`,
    height: `${squareDimensions.value.height}px`,
    left: `${squareDimensions.value.width * point.x}px`,
    width: `${squareDimensions.value.width}px`,
  };
};

const colorPoint = (e: MouseEvent, point: Square) => {
  if (e.buttons !== 1) return;

  updatePointColor(point);

  let mirrorPointX: number | null = null;
  if (settings.value.mirrorX) {
    mirrorPointX = dimensions.value.width - (point.x + 1);
    const mirrorPoint = pattern.value.find((p) => p.x === mirrorPointX && p.y === point.y)!;
    updatePointColor(mirrorPoint);
  }

  let mirrorPointY: number | null = null;
  if (settings.value.mirrorY) {
    mirrorPointY = dimensions.value.height - (point.y + 1);
    const mirrorPoint = pattern.value.find((p) => p.x === point.x && p.y === mirrorPointY)!;
    updatePointColor(mirrorPoint);
  }

  if (mirrorPointX !== null && mirrorPointY !== null) {
    const mirrorPoint = pattern.value.find((p) => p.x === mirrorPointX && p.y === mirrorPointY)!;
    updatePointColor(mirrorPoint);
  }
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
