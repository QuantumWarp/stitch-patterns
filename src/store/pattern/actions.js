import PatternHelper from '../../helpers/pattern-helper';

export default {
  updatePatternDetails({ commit, state }, details) {
    commit('setPatternDetails', { ...state.patternDetails, ...details });
  },
  updatePointColor({ commit, getters }, point) {
    commit('updatePoint', { ...point, color: getters.settings.color });
  },
  updatePattern({ commit }, pattern) {
    commit('setPattern', pattern);
  },
  fillPattern({ dispatch, getters }) {
    const pattern = PatternHelper.createFilledPattern(getters.dimensions, getters.settings.color);
    dispatch('updatePattern', pattern);
  },
  adjustDimensions({ dispatch, getters }, dimensions) {
    let newHeight = dimensions.height > 80 ? 80 : dimensions.height;
    newHeight = newHeight < 1 ? 30 : newHeight;
    let newWidth = dimensions.width > 80 ? 80 : dimensions.width;
    newWidth = newWidth < 1 ? 30 : newWidth;

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
          if (getters.dimensions.width >= 80) return;
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMin - 1,
            y: getters.bounds.yMin + index,
          }));
          break;
        case 'right':
          if (getters.dimensions.width >= 80) return;
          additions.length = getters.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMax + 1,
            y: getters.bounds.yMin + index,
          }));
          break;
        case 'top':
          if (getters.dimensions.height >= 80) return;
          additions.length = getters.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: getters.bounds.xMin + index,
            y: getters.bounds.yMin - 1,
          }));
          break;
        case 'bottom':
          if (getters.dimensions.height >= 80) return;
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
          if (getters.dimensions.width <= 1) return;
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMin);
          break;
        case 'right':
          if (getters.dimensions.width <= 1) return;
          newPattern = getters.pattern.filter((point) => point.x !== getters.bounds.xMax);
          break;
        case 'top':
          if (getters.dimensions.height <= 1) return;
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMin);
          break;
        case 'bottom':
          if (getters.dimensions.height <= 1) return;
          newPattern = getters.pattern.filter((point) => point.y !== getters.bounds.yMax);
          break;
        default:
          throw new Error('Invalid side');
      }
    }
    dispatch('updatePattern', newPattern);
  },
};
