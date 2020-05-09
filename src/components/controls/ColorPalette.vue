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
        <ArrowDownwardIcon
          v-if="index === 0"
          class="selected-pointer"
        />

        <button
          :style="{ backgroundColor: color }"
          @click="updateSettings({ color })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ArrowDownwardIcon from 'vue-material-design-icons/ArrowDown.vue';
import PanelButton from '../inputs/PanelButton.vue';

export default {
  components: {
    PanelButton,
    ArrowDownwardIcon,
  },
  data: () => ({
    pickerColor: '#000000',
  }),
  computed: {
    ...mapGetters(['colorPalette']),
    colorPaletteTen() {
      const palette = this.colorPalette;
      while (palette.length < 10) {
        palette.push('#ffffff');
      }
      return palette;
    },
  },
  methods: {
    ...mapActions([
      'updateSettings',
      'fillPattern',
    ]),
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
  top: -26px;
  transform: translateX(-50%);
}
</style>
