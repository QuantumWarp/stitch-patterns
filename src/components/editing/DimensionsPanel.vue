<template>
  <div class="dimension-adjuster">
    <div v-if="manualAdjuster" class="manual-input">
      <PanelInput
        :model-value="height.toString()"
        @update:model-value="height = Number($event)"
        type="number"
        label="Height"
      />

      <PanelInput
        :model-value="width.toString()"
        @update:model-value="width = Number($event)"
        type="number"
        label="Width"
      />
    </div>

    <div class="buttons">
      <PanelButton
        v-if="!manualAdjuster"
        @click="manualAdjuster = true"
      >
        Manual
      </PanelButton>

      <PanelButton
        v-if="manualAdjuster"
        :danger="potentiallyDangerous"
        @click="adjustDimensions({ height, width }); manualAdjuster = false"
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
import { computed, ref } from 'vue';

import PanelButton from '@/components/inputs/PanelButton.vue';
import PanelInput from '@/components/inputs/PanelInput.vue';

import type { Dimensions, Pattern } from '@/models/pattern.ts';
import type { EditSettings } from '@/models/settings.ts';

const pattern = defineModel<Pattern>('pattern', { required: true });
const { settings } = defineProps<{ settings: EditSettings}>();

const manualAdjuster = ref(false);
const height = ref(pattern.value.dimensions.height);
const width = ref(pattern.value.dimensions.width);

const potentiallyDangerous = computed(() => {
  return height.value < pattern.value.dimensions.height
    || width.value < pattern.value.dimensions.width;
});

function adjustDimensions(dimensions: Dimensions) {
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
.manual-input {
  padding: 0px 40px 15px 40px;
  display: flex;
  gap: 10px;
}

.dimension-adjuster {
  padding: 20px 0px 0px 0px;
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
  gap: 6px;
}
</style>
