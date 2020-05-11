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
      :class="{ completed: currentRowIndex < selectedStitchInfo.rowIndex }"
      class="knit-content"
    >
      <div
        v-for="(stitch, index) in currentRow"
        :key="Object.values(stitch).concat([index]).join('-')"
        ref="stitchEntries"
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
      'selectedStitch',
      'selectedStitchInfo',
    ]),
    currentRow() {
      return this.knitPattern[this.currentRowIndex];
    },
  },
  watch: {
    selectedStitch() {
      this.currentRowIndex = this.selectedStitchInfo.rowIndex;
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
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case 39: this.nextRow(); break;
          case 37: this.previousRow(); break;
          default: break;
        }
      } else {
        switch (event.keyCode) {
          case 40: this.nextStitch(); break;
          case 38: this.previousStitch(); break;
          default: break;
        }
      }
    },
    nextRow() {
      if (this.selectedStitchInfo.isEndRow) return;
      this.selectStitch(this.knitPattern[this.selectedStitchInfo.rowIndex + 1][0]);
      this.scrollStitchIntoView();
    },
    previousRow() {
      if (this.selectedStitchInfo.isStartRow) return;
      const previousRow = this.knitPattern[this.selectedStitchInfo.rowIndex - 1];
      this.selectStitch(previousRow[previousRow.length - 1]);
      this.scrollStitchIntoView();
    },
    nextStitch() {
      if (this.selectedStitchInfo.isEndStitch && this.selectedStitchInfo.isEndRow) return;
      if (this.selectedStitchInfo.isEndStitch) {
        this.selectStitch(this.knitPattern[this.selectedStitchInfo.rowIndex + 1][0]);
      } else {
        this.selectStitch(this.selectedStitchInfo.row[this.selectedStitchInfo.stitchIndex + 1]);
      }
      this.scrollStitchIntoView();
    },
    previousStitch() {
      if (this.selectedStitchInfo.isStartStitch && this.selectedStitchInfo.isStartRow) return;
      if (this.selectedStitchInfo.isStartStitch) {
        const previousRow = this.knitPattern[this.selectedStitchInfo.rowIndex - 1];
        this.selectStitch(previousRow[previousRow.length - 1]);
      } else {
        this.selectStitch(this.selectedStitchInfo.row[this.selectedStitchInfo.stitchIndex - 1]);
      }
      this.scrollStitchIntoView();
    },
    stitchClass(stitch) {
      return {
        selected: this.selectedStitch === stitch,
        complete: this.currentRowIndex < this.selectedStitchInfo.rowIndex
          || (this.currentRowIndex === this.selectedStitchInfo.rowIndex
            && this.selectedStitchInfo.row.indexOf(stitch) < this.selectedStitchInfo.stitchIndex),
      };
    },
    scrollStitchIntoView() {
      this.$nextTick(() => {
        const stitchEl = this.$refs.stitchEntries.find((x) => x.classList.contains('selected'));
        if (stitchEl) {
          stitchEl.scrollIntoView({ block: 'center' });
        }
      });
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
  height: 382px;
  max-height: 382px;
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
  font-size: 22px;
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
