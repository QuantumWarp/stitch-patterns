<template>
  <div class="grid-pattern" :style="gridStyle">
    <div
      v-for="point in pattern.squares"
      :key="`${point.x}-${point.y}`"
      class="grid-square"
      :style="getPointStyle(point)"
      @mousedown="colorPoint($event, point)"
      @mouseover="colorPoint($event, point)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Settings } from '../../models/settings.ts';
import type { Pattern, PatternSquare } from '../../models/pattern.ts';

const emit = defineEmits<{ onUpdate: [pattern: Pattern] }>();
const { pattern, settings } = defineProps<{
  pattern: Pattern,
  settings: Settings
}>();

const squareDimensions = ref({ width: 25, height: 20 });

const gridStyle = computed(() => {
  return {
    top: `${squareDimensions.value.height}px`,
    left: `${squareDimensions.value.width}px`,
    transform: settings.rotate
      ? `rotate(90deg)
        translateX(${(squareDimensions.value.height) - (squareDimensions.value.width)}px)
        translateY(${(squareDimensions.value.width) - (squareDimensions.value.height * (pattern.dimensions.height))}px)`
      : 'none',
  };
});

const getPointStyle = (point: PatternSquare) => {
  return {
    backgroundColor: pattern.colors[point.colorIndex],
    top: `${squareDimensions.value.height * point.y}px`,
    height: `${squareDimensions.value.height}px`,
    left: `${squareDimensions.value.width * point.x}px`,
    width: `${squareDimensions.value.width}px`,
  };
};

const updatePoint = (newPattern: Pattern, point: PatternSquare) => {
  const squares = newPattern.squares;
  const updatedPoint: PatternSquare = { ...point, colorIndex: settings.colorIndex };
  const index = squares.indexOf(point);
  if (index === -1) return newPattern;
  return  {
    ...newPattern,
    squares: [...squares.slice(0, index), updatedPoint, ...squares.slice(index + 1)]
  };
};


const colorPoint = (e: MouseEvent, point: PatternSquare) => {
  if (e.buttons !== 1) return;

  let updatedPattern = pattern;
  updatedPattern = updatePoint(updatedPattern, point);

  let mirrorPointX: number | null = null;
  if (settings.mirrorX) {
    mirrorPointX = pattern.dimensions.width - (point.x + 1);
    const mirrorPoint = pattern.squares.find((p) => p.x === mirrorPointX && p.y === point.y)!;
    updatedPattern = updatePoint(updatedPattern, mirrorPoint);
  }

  let mirrorPointY: number | null = null;
  if (settings.mirrorY) {
    mirrorPointY = pattern.dimensions.height - (point.y + 1);
    const mirrorPoint = pattern.squares.find((p) => p.x === point.x && p.y === mirrorPointY)!;
    updatedPattern = updatePoint(updatedPattern, mirrorPoint);
  }

  if (mirrorPointX !== null && mirrorPointY !== null) {
    const mirrorPoint = pattern.squares.find((p) => p.x === mirrorPointX && p.y === mirrorPointY)!;
    updatedPattern = updatePoint(updatedPattern, mirrorPoint);
  }

  emit("onUpdate", updatedPattern);
};
</script>

<style scoped>
.grid-pattern {
  position: relative;
  width: 100%;
  height: 100%;
}

.grid-square {
  position: absolute;
  border: 1px solid grey;
  user-select: none;
}
</style>
