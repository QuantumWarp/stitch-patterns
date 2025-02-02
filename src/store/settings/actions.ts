export default {
  updatePanelState({ panel, open }) {
    const newPanels = open ? [panel] : [];
    this.openPanels = newPanels;
  },
  resetSettings() {
    this.settings = {
      color: '#000000',
      rotate: false,
      mirrorX: false,
      mirrorY: false,
    }
    this.colorPalette = [
      '#000000',
      '#ffffff',
    ];
  },
  updateSettings(settingsUpdate) {
    if (settingsUpdate.color) {
      this.colorPalette = [settingsUpdate.color]
        .concat(this.colorPalette)
        .filter((val, index, self) => self.indexOf(val) === index)
        .slice(0, 10);
    }

    this.settings = { ...this.settings, ...settingsUpdate };
  },
};
