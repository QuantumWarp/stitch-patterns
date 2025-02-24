<template>
  <div class="color-palette">
    <div class="options-div">
      <PanelButton
        v-if="pattern.colors.length < 10"
        @click="editIndex = pattern.colors.length; colorPickerEl!.click()"
      >
        Add
      </PanelButton>

      <PanelButton
        v-if="pattern.colors.length > 2"
        danger
        @click="deleteColor()"
      >
        Delete
      </PanelButton>

      <PanelButton
        danger
        @click="fillColor()"
      >
        Fill
      </PanelButton>

      <input
        ref="colorpicker"
        v-model="pickerColor"
        type="color"
        @change="editColor()"
      >
    </div>

    <div class="palette">
      <div
        v-for="(color, index) in pattern.colors"
        :key="index + color"
        class="palette-entry"
        @click="settings = { ...settings, colorIndex: index }"
      >
        <div class="palette-color" :style="<CSSProperties>{ backgroundColor: color }" @click="editIndex = index; colorPickerEl!.click()" />
        <div v-if="settings.colorIndex === index" class="palette-selected">{{ "< Selected" }}</div>
        <div v-if="settings.colorIndex !== index" class="palette-select">{{ "< Select" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, type CSSProperties } from 'vue';

import PanelButton from '../inputs/PanelButton.vue';
import type { Settings } from '../../models/settings.ts';
import type { Pattern } from '../../models/pattern.ts';

const colorPickerEl = useTemplateRef('colorpicker')

const pattern = defineModel<Pattern>("pattern", { required: true });
const settings = defineModel<Settings>("settings", { required: true });

const pickerColor = ref("#000000");
const editIndex = ref<number>();

const editColor = () => {
  if (editIndex.value === undefined) return;
  const colors = [...pattern.value.colors];
  if (editIndex.value === colors.length) {
    colors.push(pickerColor.value);
  } else {
    colors[editIndex.value] = pickerColor.value;
  }
  pattern.value = { ...pattern.value, colors };
  settings.value = { ...settings.value, colorIndex: editIndex.value };
  editIndex.value = undefined;
};

const deleteColor = () => {
  const colors = pattern.value.colors.slice(0, pattern.value.colors.length - 1);
  pattern.value = { ...pattern.value, colors };
  settings.value = { ...settings.value, colorIndex: colors.length - 1 };
};

const fillColor = () => {
  pattern.value = {
    ...pattern.value,
    squares: pattern.value.squares
      .map((square) => ({ ...square, colorIndex: settings.value.colorIndex }))
  };
};
</script>

<style scoped>
.color-palette {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 25px 30px;
}
.options-div {
  position: relative;
  margin-bottom: 8px;
}
.options-div :not(:last-child) {
  margin-right: 6px;
}
input {
  visibility: hidden;
  position: absolute;
  left: 0px;
  bottom: 0;
}

.palette {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.palette-entry {
  min-width: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.palette-color {
  width: 35px;
  height: 15px;
  border: 2px solid grey;
  border-top: none;
  padding: 5px;
}
.palette-entry:nth-child(-n + 2) .palette-color {
  border-top: 2px solid grey;
}
.palette-selected {
  margin-left: 5px;
  font-weight: bold;
}
.palette-select {
  margin-left: 5px;
  opacity: 0;
}
.palette-entry:hover .palette-select {
  opacity: 1;
  transition: ease-in-out .2s;
}
</style>
