import { defineStore } from 'pinia';
import PatternHelper from '../helpers/pattern-helper';
import type { Dimensions } from '../models/dimensions';
import { useSettingsStore } from './settings';
import type { GridSquares, Square } from '../models/grid';
import type { PatternDetails } from '../models/pattern';

export const usePatternStore = defineStore('pattern', {
  state: () => ({
    dirty: false,
    patternDetails: {
      name: '',
    },
    pattern: [] as GridSquares,
  }),

  getters: {
    sortedPattern(state) {
      return state.pattern.sort((a, b) => {
        if (a.x === b.x) return a.y > b.y ? 1 : -1;
        return a.x > b.x ? 1 : -1;
      });
    },

    bounds(state) {
      const xPoints = state.pattern.map((point) => point.x);
      const yPoints = state.pattern.map((point) => point.y);
      return {
        xMax: Math.max(...xPoints),
        xMin: Math.min(...xPoints),
        yMax: Math.max(...yPoints),
        yMin: Math.min(...yPoints),
      };
    },

    dimensions(): Dimensions {
      return PatternHelper.getDimensionsFromSortedPatten(this.sortedPattern);
    },
  },

  actions: {
    updatePatternDetails(details: Partial<PatternDetails>) {
      this.patternDetails = { ...this.patternDetails, ...details };
    },

    updatePointColor(point: Square) {
      const settingsStore = useSettingsStore();
      this.updatePoint({ ...point, color: settingsStore.settings.color });
      this.dirty = true;
    },

    updatePoint({ x, y, color }: Square) {
      const foundPoint = this.pattern.find(
        (point) => point.x === x && point.y === y,
      );
      if (foundPoint) {
        foundPoint.color = color;
      }
    },

    updatePattern(pattern: GridSquares) {
      this.pattern = pattern;
      this.dirty = true;
    },

    fillPattern() {
      const settingsStore = useSettingsStore();
      const pattern = PatternHelper.createFilledPattern(this.dimensions, settingsStore.settings.color);
      this.updatePattern(pattern);
    },

    adjustDimensions(dimensions: Dimensions) {
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

    incrementDimension({ side, op }: { side: string, op: string }) {
      const settingsStore = useSettingsStore();
      let newPattern: GridSquares = [];
  
      if (op === 'add') {
        let additions: Square[] = [];
        let coords: { x: number, y: number }[] = [];
  
        switch (side) {
          case 'left':
            if (this.dimensions.width >= 80) return;
            coords = Array(this.dimensions.height).fill(0).map((val, index) => ({
              x: this.bounds.xMin - 1,
              y: this.bounds.yMin + index,
            }));
            break;
          case 'right':
            if (this.dimensions.width >= 80) return;
            coords = Array(this.dimensions.height).fill(0).map((val, index) => ({
              x: this.bounds.xMax + 1,
              y: this.bounds.yMin + index,
            }));
            break;
          case 'top':
            if (this.dimensions.height >= 80) return;
            coords = Array(this.dimensions.width).fill(0).map((val, index) => ({
              x: this.bounds.xMin + index,
              y: this.bounds.yMin - 1,
            }));
            break;
          case 'bottom':
            if (this.dimensions.height >= 80) return;
            coords = Array(this.dimensions.width).fill(0).map((val, index) => ({
              x: this.bounds.xMin + index,
              y: this.bounds.yMax + 1,
            }));
            break;
          default:
            throw new Error('Invalid side');
        }
        additions = coords.map((point) => ({
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
  }
});
