<template>
  <div class="grid-pattern">
    <div
      v-for="point in pattern"
      :key="`${point.x}-${point.y}`"
      class="grid-square"
      :style="getStyle(point)"
      @mousedown="colorPoint($event, point)"
      @mouseover="colorPoint($event, point)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    mouseDown: false,
    squareDimensions: { width: 25, height: 20 },
  }),
  computed: {
    ...mapGetters([
      'pattern',
      'dimensions',
      'drawingSettings',
    ]),
  },
  methods: {
    getStyle(point) {
      return {
        backgroundColor: point.color,
        top: `${this.squareDimensions.height * point.y}px`,
        height: `${this.squareDimensions.height}px`,
        left: `${this.squareDimensions.width * point.x}px`,
        width: `${this.squareDimensions.width}px`,
      };
    },
    colorPoint(e, point) {
      if (e.buttons !== 1) return;

      point.color = this.drawingSettings.color;

      let mirrorPointX = null;
      if (this.drawingSettings.mirrorX) {
        mirrorPointX = this.dimensions.width - point.x;
        const mirrorPoint = this.pattern.find((p) => p.x === mirrorPointX && p.y === point.y);
        mirrorPoint.color = this.drawingSettings.color;
      }

      let mirrorPointY = null;
      if (this.drawingSettings.mirrorY) {
        mirrorPointY = this.dimensions.height - point.y;
        const mirrorPoint = this.pattern.find((p) => p.x === point.x && p.y === mirrorPointY);
        mirrorPoint.color = this.drawingSettings.color;
      }

      if (mirrorPointX && mirrorPointY) {
        const mirrorPoint = this.pattern.find((p) => p.x === mirrorPointX && p.y === mirrorPointY);
        mirrorPoint.color = this.drawingSettings.color;
      }
    },
  },
};
</script>

<style scoped>
.grid-pattern {
  position: relative;
}
.grid-square {
  position: absolute;
  border: 1px solid grey;
  user-select: none;
}
</style>