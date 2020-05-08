export default {
  updatePatternDetails({ commit, dispatch, state }, details) {
    commit('setPatternDetails', { ...state.patternDetails, ...details });
    dispatch('saveSessionDebounce');
  },
  updatePointColor({ commit, dispatch, getters }, point) {
    commit('updatePoint', { ...point, color: getters.settings.color });
    dispatch('saveSessionDebounce');
  },
  updatePattern({ commit, dispatch }, pattern) {
    commit('setPattern', pattern);
    dispatch('saveSessionDebounce');
  },
  fillPattern({ dispatch, getters }) {
    const pattern = [];
    for (let x = 0; x < getters.dimensions.width; x += 1) {
      for (let y = 0; y < getters.dimensions.height; y += 1) {
        pattern.push({ x, y, color: getters.settings.color });
      }
    }
    dispatch('updatePattern', pattern);
  },
  adjustDimensions({ dispatch, getters }, dimensions) {
    let newHeight = dimensions.height > 80 ? 80 : dimensions.height;
    newHeight = dimensions.height < 1 ? 30 : dimensions.height;
    let newWidth = dimensions.width > 80 ? 80 : dimensions.width;
    newWidth = dimensions.width < 1 ? 30 : dimensions.width;

    const heightDiff = getters.dimensions.height - newHeight;
    const widthDiff = getters.dimensions.width - newWidth;

    for (let y = 0; y < Math.abs(heightDiff); y += 1) {
      dispatch('incrementDimension', { side: 'bottom', op: heightDiff < 0 ? 'add' : 'remove' });
    }

    for (let x = 0; x < Math.abs(widthDiff); x += 1) {
      dispatch('incrementDimension', { side: 'right', op: widthDiff < 0 ? 'add' : 'remove' });
    }
  },
  incrementDimension({ dispatch, getters }, { side, op }) {
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
        color: getters.settings.color,
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
    dispatch('updatePattern', newPattern);
  },
};
