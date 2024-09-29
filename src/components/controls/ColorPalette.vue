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
          <font-awesome-icon
            v-if="index === 0"
            :icon="['fas', 'arrow-down']"
          />
        </div>

        <button
          :style="{ backgroundColor: color }"
          @click="updateSettings({ color })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/store/settings/state';
import { usePatternStore } from '@/store/pattern/state';

import PanelButton from '../inputs/PanelButton.vue';

export default {
  components: {
    PanelButton,
  },
  setup() {
    const patternStore = usePatternStore();
    const { fillPattern } = patternStore;

    const settingsStore = useSettingsStore();
    const { colorPalette } = storeToRefs(settingsStore);
    const { updateSettings } = settingsStore;

    return {
      colorPalette,
      updateSettings,
      fillPattern,
    };
  },
  data: () => ({
    pickerColor: '#000000',
  }),
  computed: {
    colorPaletteTen() {
      const palette = this.colorPalette;
      while (palette.length < 10) {
        palette.push('#ffffff');
      }
      return palette;
    },
  },
};
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
