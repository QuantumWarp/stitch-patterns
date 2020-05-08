<template>
  <div class="color-palette">
    <div class="picker-div">
      <button @click="$refs.colorpicker.click()">
        New Color
      </button>

      <input
        ref="colorpicker"
        v-model="pickerColor"
        type="color"
        @change="updateDrawingSettings({ color: pickerColor })"
      >
    </div>

    <div class="palette">
      <div
        v-for="(color, index) in colorPaletteTen"
        :key="index + color"
        class="palette-box"
      >
        <div
          v-if="index === 0"
          class="selected-pointer"
        >
          ^
        </div>

        <button
          :style="{ backgroundColor: color }"
          @click="updateDrawingSettings({ color })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
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
    ...mapActions(['updateDrawingSettings']),
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
.picker-div {
  position: relative;
  width: 50%;
  padding: 5px;
}
.picker-div > * {
  width: 100%;
}
input {
  visibility: hidden;
  position: absolute;
}
.palette-box {
  position: relative;
  min-width: 20%;
  max-width: 20%;
  box-sizing: border-box;
  padding: 5px;
}
button {
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
  top: -33px;
  transform: rotate(180deg) translate(50%);
}
</style>
