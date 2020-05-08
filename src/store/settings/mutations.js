/* eslint-disable no-param-reassign */
export default {
  setDrawingSettings(state, drawingSettings) {
    state.drawingSettings = drawingSettings;
  },
  addToColorPalette(state, colors) {
    state.colorPalette = colors
      .concat(state.colorPalette)
      .filter((val, index, self) => self.indexOf(val) === index)
      .slice(0, 10);
  },
};
