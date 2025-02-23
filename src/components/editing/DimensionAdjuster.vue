<template>
  <div class="dimension-adjuster">
    <PanelInput
      v-model="height"
      type="number"
      label="Height"
    />

    <PanelInput
      v-model="width"
      type="number"
      label="Width"
    />

    <div class="buttons">
      <PanelButton
        :danger="potentiallyDangerous"
        @click="adjustDimensions({ height, width })"
      >
        Apply
      </PanelButton>

      <PanelButton
        danger
        @click="adjustDimensions({ height: 30, width: 30 })"
      >
        Reset
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';
import { computed, ref } from 'vue';
import type { Dimensions, Pattern } from '../../models/pattern.ts';
import type { Settings } from '../../models/settings.ts';

const pattern = defineModel<Pattern>("pattern", { required: true });
const { settings } = defineProps<{ settings: Settings}>();

const height = ref(pattern.value.dimensions.height);
const width = ref(pattern.value.dimensions.width);

const potentiallyDangerous = computed(() => {
  return height.value < pattern.value.dimensions.height
    || width.value < pattern.value.dimensions.width;
});

const adjustDimensions = (dimensions: Dimensions) => {
  let newSquares = pattern.value.squares;

  if (width.value > pattern.value.dimensions.width) {
    for (let x = pattern.value.dimensions.width; x < dimensions.width; x++) {
      for (let y = 0; y < dimensions.height; y++) {
        newSquares.push({ x, y, colorIndex: settings.colorIndex });
      }
    }
  }

  if (height.value > pattern.value.dimensions.height) {
    for (let y = pattern.value.dimensions.height; y < dimensions.height; y++) {
      for (let x = 0; x < dimensions.width; x++) {
        newSquares.push({ x, y, colorIndex: settings.colorIndex });
      }
    }
  }

  if (width.value < pattern.value.dimensions.width)
    newSquares = newSquares.filter((x) => x.x < dimensions.width);

  if (height.value < pattern.value.dimensions.height)
    newSquares = newSquares.filter((x) => x.y < dimensions.height);

  pattern.value = { ...pattern.value, dimensions, squares: newSquares };
};
</script>

<style scoped>
.dimension-adjuster {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.dimension-adjuster>*:not(:last-child) {
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.buttons>* {
  width: 40%;
}

.buttons :first-child {
  margin-right: 6px;
}
</style>
