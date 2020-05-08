/* eslint-disable no-param-reassign */
export default {
  setSettings(state, settings) {
    state.settings = settings;
  },
  resetColorPalette(state) {
    state.colorPalette = [
      '#000000',
      '#ffffff',
    ];
  },
  addToColorPalette(state, colors) {
    state.colorPalette = colors
      .concat(state.colorPalette)
      .filter((val, index, self) => self.indexOf(val) === index)
      .slice(0, 10);
  },
};
