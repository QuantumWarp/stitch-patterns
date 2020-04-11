<template>
  <div class="grid-pattern">
    <div
      v-for="point in value"
      :key="`${point.x}-${point.y}`"
      class="grid-square"
      :style="getStyle(point)"
      @mousedown="colorPoint(point, true)"
      @mouseover="colorPoint(point)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    mirrorX: Boolean,
    mirrorY: Boolean,
    color: String,
  },
  data: () => ({
    mouseDown: false,
  }),
  computed: {
    maxHeight() {
      return Math.max(...this.value.map((point) => point.y));
    },
    maxWidth() {
      return Math.max(...this.value.map((point) => point.x));
    },
  },
  created() {
    document.body.onmousedown = () => this.mouseDown = true;
    document.body.onmouseup = () => this.mouseDown = false;
  },
  methods: {
    getStyle(point) {
      return {
        backgroundColor: point.color,
        top: `${20 * point.y}px`,
        height: '20px',
        left: `${25 * point.x}px`,
        width: '25px',
      };
    },
    colorPoint(point, force) {
      if (this.mouseDown || force) {
        point.color = this.color;

        let mirrorPointX = null;
        if (this.mirrorX) {
          mirrorPointX = this.maxWidth - point.x;
          const mirrorPoint = this.value.find((p) => p.x === mirrorPointX && p.y === point.y);
          mirrorPoint.color = this.color;
        }

        let mirrorPointY = null;
        if (this.mirrorY) {
          mirrorPointY = this.maxHeight - point.y;
          const mirrorPoint = this.value.find((p) => p.x === point.x && p.y === mirrorPointY);
          mirrorPoint.color = this.color;
        }

        if (mirrorPointX && mirrorPointY) {
          const mirrorPoint = this.value.find((p) => p.x === mirrorPointX && p.y === mirrorPointY);
          mirrorPoint.color = this.color;
        }
      }
    },
  },
}
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