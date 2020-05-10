<template>
  <div class="knit-panel">
    <div class="knit-panel-header">
      <PrevIcon
        v-if="currentRowIndex > 0"
        class="icon left"
        @click="currentRowIndex -= 1"
      />

      <span class="title">
        Row {{ currentRowIndex + 1 }}
      </span>

      <NextIcon
        v-if="currentRowIndex < knitPattern.length - 1"
        class="icon right"
        @click="currentRowIndex += 1"
      />
    </div>

    <div
      :class="{ completed: currentRowIndex < rowIndex }"
      class="knit-content"
    >
      <div
        v-for="(stitch, index) in currentRow"
        :key="Object.values(stitch).concat([index]).join('-')"
        :class="stitchClass(stitch)"
        class="stitch-entry"
        @click="selectStitch(stitch)"
      >
        <div
          class="stitch-color"
          :style="{ backgroundColor: stitch.color }"
        />
        <span>{{ stitch.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PrevIcon from 'vue-material-design-icons/ArrowLeftBold.vue';
import NextIcon from 'vue-material-design-icons/ArrowRightBold.vue';

export default {
  components: {
    PrevIcon,
    NextIcon,
  },
  data: () => ({
    row: 1,
    rowCount: 0,
    time: 0,
    currentRowIndex: 0,
  }),
  computed: {
    ...mapGetters([
      'knitPattern',
      'selectedRow',
      'selectedStitch',
    ]),
    currentRow() { return this.knitPattern[this.currentRowIndex]; },
    stitchIndex() { return this.selectedRow.indexOf(this.selectedStitch); },
    isStartStitch() { return this.stitchIndex === 0; },
    isEndStitch() { return this.stitchIndex === this.selectedRow.length - 1; },
    rowIndex() { return this.knitPattern.indexOf(this.selectedRow); },
    isStartRow() { return this.rowIndex === 0; },
    isEndRow() { return this.rowIndex === this.knitPattern.length - 1; },
  },
  watch: {
    selectedStitch() {
      this.currentRowIndex = this.rowIndex;
    },
  },
  created() {
    document.addEventListener('keydown', this.keyDownHandler);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDownHandler);
  },
  methods: {
    ...mapActions(['selectStitch']),
    keyDownHandler(event) {
      switch (event.keyCode) {
        case 39: this.nextRow(); break;
        case 37: this.previousRow(); break;
        case 40: this.nextStitch(); break;
        case 38: this.previousStitch(); break;
        default: break;
      }
    },
    nextRow() {
      if (this.isEndRow) return;
      this.selectStitch(this.knitPattern[this.rowIndex + 1][0]);
    },
    previousRow() {
      if (this.isStartRow) return;
      const previousRow = this.knitPattern[this.rowIndex - 1];
      this.selectStitch(previousRow[previousRow.length - 1]);
    },
    nextStitch() {
      if (this.isEndStitch && this.isEndRow) return;
      if (this.isEndStitch) {
        this.selectStitch(this.knitPattern[this.rowIndex + 1][0]);
      } else {
        this.selectStitch(this.selectedRow[this.stitchIndex + 1]);
      }
    },
    previousStitch() {
      if (this.isStartStitch && this.isStartRow) return;
      if (this.isStartStitch) {
        const previousRow = this.knitPattern[this.rowIndex - 1];
        this.selectStitch(previousRow[previousRow.length - 1]);
      } else {
        this.selectStitch(this.selectedRow[this.stitchIndex - 1]);
      }
    },
    stitchClass(stitch) {
      return {
        selected: this.selectedStitch === stitch,
        complete: this.currentRowIndex < this.rowIndex
          || (this.currentRowIndex === this.rowIndex
            && this.selectedRow.indexOf(stitch) < this.stitchIndex),
      };
    },
  },
};
</script>

<style scoped>
.knit-panel {
  flex: 1;
  margin-left: 10px;
  border: 2px solid grey;
  border-radius: 5px;
  overflow: hidden;
}
.knit-content {
  overflow-y: scroll;
  height: 342px;
  max-height: 342px;
}
.knit-content.completed {
  background-color: lightgreen;
}
.knit-panel-header {
  display: flex;
  align-items: stretch;
  justify-content: center;
  border-bottom: 2px solid grey;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
  position: relative;
}
.knit-panel-header > .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 35px;
}
.knit-panel-header > .icon.left {
  left: 0;
}
.knit-panel-header > .icon.right {
  right: 0;
}
.knit-panel-header > .icon:hover {
  background-color: #eee;
}
.knit-panel-header > .title {
  display: flex;
  align-items: center;
}
.stitch-entry {
  height: 18px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.stitch-entry.selected {
  background-color: plum;
}
.stitch-entry.complete {
  background-color: lightgreen;
}
.stitch-color {
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 10px;
}
</style>
