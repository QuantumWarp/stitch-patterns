<template>
  <div class="color-palette">
    <div class="options-div">
      <PanelButton
        class="new-button"
        @click="$refs.colorpicker.click()"
      >
        New Colour
      </PanelButton>

      <PanelButton
        class="fill-button"
        danger
        @click="fillPattern"
      >
        Fill
      </PanelButton>

      <input
        ref="colorpicker"
        v-model="pickerColor"
        type="color"
        @change="updateSettings({ color: pickerColor })"
      >
    </div>

    <div class="palette">
      <div
        v-for="(color, index) in colorPaletteTen"
        :key="index + color"
        class="palette-box"
      >
        <div class="selected-pointer">
          <i class="material-icons" v-if="index === 0">arrow_downward</i>
        </div>

        <button
          :style="<CSSProperties>{ backgroundColor: color }"
          @click="updateSettings({ color })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/store/settings';
import { usePatternStore } from '@/store/pattern';

import PanelButton from '../inputs/PanelButton.vue';

const patternStore = usePatternStore();
const { fillPattern } = patternStore;

const settingsStore = useSettingsStore();
const { colorPalette } = storeToRefs(settingsStore);
const { updateSettings } = settingsStore;
  
const pickerColor = ref('#000000');

const colorPaletteTen = computed(() => {
  const palette = colorPalette.value;
  while (palette.length < 10) {
    palette.push('#ffffff');
  }
  return palette;
});
</script>

<style scoped>
.color-palette {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.palette {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.options-div {
  position: relative;
  margin-bottom: 8px;
}

.options-div :first-child {
  margin-right: 6px;
}

.new-button {
  width: 120px;
}

.fill-button {
  width: 80px;
}

input {
  visibility: hidden;
  position: absolute;
  left: 0px;
  bottom: 0;
}

.palette-box {
  position: relative;
  min-width: 20%;
  max-width: 20%;
  box-sizing: border-box;
  padding: 5px;
}

.palette button {
  width: 100%;
  height: 35px;
  outline: none;
  border: 2px solid grey;
  border-radius: 6px;
  padding: 5px;
  cursor: pointer;
}

.selected-pointer {
  position: absolute;
  font-size: 40px;
  left: 50%;
  top: -100%;
  transform: translateX(-50%);
}
</style>
