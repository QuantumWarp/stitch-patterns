import { useSettingsStore } from '../settings/state';
import PatternHelper from '../../helpers/pattern-helper';

export default {
  updatePatternDetails(details) {
    this.patternDetails = { ...this.patternDetails, ...details };
  },
  updatePointColor(point) {
    const settingsStore = useSettingsStore();
    this.updatePoint({ ...point, color: settingsStore.settings.color });
    this.dirty = true;
  },
  updatePoint({ x, y, color }) {
    const foundPoint = this.pattern.find(
      (point) => point.x === x && point.y === y,
    );
    foundPoint.color = color;
  },
  updatePattern(pattern) {
    this.pattern = pattern;
    this.dirty = true;
  },
  fillPattern() {
    const settingsStore = useSettingsStore();
    const pattern = PatternHelper.createFilledPattern(this.dimensions, settingsStore.settings.color);
    this.updatePattern(pattern);
  },
  adjustDimensions(dimensions) {
    let newHeight = dimensions.height > 80 ? 80 : dimensions.height;
    newHeight = newHeight < 1 ? 30 : newHeight;
    let newWidth = dimensions.width > 80 ? 80 : dimensions.width;
    newWidth = newWidth < 1 ? 30 : newWidth;

    const heightDiff = this.dimensions.height - newHeight;
    const widthDiff = this.dimensions.width - newWidth;

    for (let y = 0; y < Math.abs(heightDiff); y += 1) {
      this.incrementDimension({ side: 'bottom', op: heightDiff < 0 ? 'add' : 'remove' });
    }

    for (let x = 0; x < Math.abs(widthDiff); x += 1) {
      this.incrementDimension({ side: 'right', op: widthDiff < 0 ? 'add' : 'remove' });
    }
  },
  incrementDimension({ side, op }) {
    const settingsStore = useSettingsStore();
    let newPattern;

    if (op === 'add') {
      let additions = [];

      switch (side) {
        case 'left':
          if (this.dimensions.width >= 80) return;
          additions.length = this.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: this.bounds.xMin - 1,
            y: this.bounds.yMin + index,
          }));
          break;
        case 'right':
          if (this.dimensions.width >= 80) return;
          additions.length = this.dimensions.height;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: this.bounds.xMax + 1,
            y: this.bounds.yMin + index,
          }));
          break;
        case 'top':
          if (this.dimensions.height >= 80) return;
          additions.length = this.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: this.bounds.xMin + index,
            y: this.bounds.yMin - 1,
          }));
          break;
        case 'bottom':
          if (this.dimensions.height >= 80) return;
          additions.length = this.dimensions.width;
          additions.fill(0);
          additions = additions.map((val, index) => ({
            x: this.bounds.xMin + index,
            y: this.bounds.yMax + 1,
          }));
          break;
        default:
          throw new Error('Invalid side');
      }
      additions = additions.map((point) => ({
        ...point,
        color: settingsStore.settings.color,
      }));
      newPattern = this.pattern.concat(additions);
    } else if (op === 'remove') {
      switch (side) {
        case 'left':
          if (this.dimensions.width <= 1) return;
          newPattern = this.pattern.filter((point) => point.x !== this.bounds.xMin);
          break;
        case 'right':
          if (this.dimensions.width <= 1) return;
          newPattern = this.pattern.filter((point) => point.x !== this.bounds.xMax);
          break;
        case 'top':
          if (this.dimensions.height <= 1) return;
          newPattern = this.pattern.filter((point) => point.y !== this.bounds.yMin);
          break;
        case 'bottom':
          if (this.dimensions.height <= 1) return;
          newPattern = this.pattern.filter((point) => point.y !== this.bounds.yMax);
          break;
        default:
          throw new Error('Invalid side');
      }
    }
    this.updatePattern(newPattern);
  },
};
