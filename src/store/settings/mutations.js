/* eslint-disable no-param-reassign */
export default {
  setOpenPanels(state, openPanels) {
    state.openPanels = openPanels;
  },
  setSettings(state, settings) {
    state.settings = settings;
  },
  setColorPalette(state, colorPalette) {
    state.colorPalette = colorPalette.slice(0, 10);
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
