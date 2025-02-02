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
import { storeToRefs } from 'pinia';
import { usePatternStore } from '@/store/pattern';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';
import { computed, ref, watch } from 'vue';

const patternStore = usePatternStore();
const { dimensions } = storeToRefs(patternStore);
const { adjustDimensions } = patternStore;

const height = ref(30);
const width = ref(30);

const potentiallyDangerous = computed(() => {
  return height.value < dimensions.value.height
    || width.value < dimensions.value.width;
});

watch(dimensions, (newDimensions) => {
  height.value = newDimensions.height;
  width.value = newDimensions.width;
})
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
