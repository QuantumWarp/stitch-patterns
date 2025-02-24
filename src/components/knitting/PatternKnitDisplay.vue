<template>
  <div class="grid-pattern" :style="gridStyle">
    <div
      class="selected-row-overlay"
      :style="selectedRowStyle"
    />

    <div
      v-for="point in pattern.squares"
      :key="`${point.x}-${point.y}`"
      class="grid-square"
      :style="getPointStyle(point)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';;
import type { Pattern, PatternSquare } from '../../models/pattern.ts';
import type { KnitSession } from '../../models/knit.ts';

const session = defineModel<KnitSession>("session", { required: true });
const { pattern } = defineProps<{ pattern: Pattern }>();

const squareDimensions = ref({ width: 25, height: 20 });

const gridStyle = computed(() => {
  return {
    top: `${squareDimensions.value.height}px`,
    left: `${squareDimensions.value.width}px`,
  };
});

const selectedRowStyle = computed(() => {
  const index = session.value.settings.fromTop
    ? session.value.rowIndex
    : pattern.dimensions.height - session.value.rowIndex - 1;
  return {
    top: `${squareDimensions.value.height * index}px`,
    left: `0px`,
    height: `${squareDimensions.value.height + 1}px`,
    width: `${squareDimensions.value.width * pattern.dimensions.width + 2}px`,
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

.selected-row-overlay {
  position: absolute;
  z-index: 1;
  box-shadow: 0px 0px 60px 30px grey;
}
</style>
