export default {
  updatePattern({ commit }, pattern) {
    commit('setPattern', pattern);
  },
  resetPattern({ commit }, patternSettings) {
    const newPatternSettings = { ...patternSettings };
    if (newPatternSettings.width > 100) newPatternSettings.width = 100;
    if (newPatternSettings.height > 100) newPatternSettings.height = 100;
    if (newPatternSettings.width < 1) newPatternSettings.width = 30;
    if (newPatternSettings.height < 1) newPatternSettings.height = 30;

    const pattern = [];
    for (let x = 0; x < newPatternSettings.width; x += 1) {
      for (let y = 0; y < newPatternSettings.height; y += 1) {
        pattern.push({
          x,
          y,
          color: newPatternSettings.refreshColor,
        });
      }
    }
    commit('setPattern', pattern);
  },
  adjustDimensions({ commit, getters }, { side, op }) {
    let newPattern;

    if (op === 'add') {
      let additions = [];

      switch (side) {
        case 'left':
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMin - 1,
            y: getters.bounds.yMin + index,
          }));
          break;
        case 'right':
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMax + 1,
            y: getters.bounds.yMin + index,
          }));
          break;
        case 'top':
          additions.length = getters.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMin + index,
            y: getters.bounds.yMin - 1,
          }));
          break;
        case 'bottom':
          additions.length = getters.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMin + index,
            y: getters.bounds.yMax + 1,
          }));
          break;
        default:
          throw new Error('Invalid side');
      }
      additions = additions.map((point) => ({
        ...point,
        color: getters.drawingSettings.color,
      }));
      newPattern = getters.pattern.concat(additions);
    } else if (op === 'remove') {
      switch (side) {
        case 'left':
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMin);
          break;
        case 'right':
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMax);
          break;
        case 'top':
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMin);
          break;
        case 'bottom':
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMax);
          break;
        default:
          throw new Error('Invalid side');
      }
    }
    commit('setPattern', newPattern);
  },
};
