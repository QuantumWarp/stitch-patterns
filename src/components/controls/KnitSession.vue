<template>
  <div class="knit-session">
    <div class="knit-helper-panel">
      <div class="knit-timer">
        <div class="row-count">
          Total - {{ rowCount }}
        </div>

        <PanelTimer
          v-model="time"
        />
      </div>

      <div class="knit-options">
        <PanelCheckbox label="From Bottom" />
        <PanelCheckbox label="From Right" />
        <PanelCheckbox label="Reverse Odd" />
        <PanelCheckbox label="Double Stitch" />
      </div>

      <div class="knit-buttons">
        <PanelButton>
          Export
        </PanelButton>

        <PanelButton danger>
          Reset Knit
        </PanelButton>
      </div>
    </div>

    <div class="knit-panel">
      <div class="knit-panel-header">
        <PrevIcon />
        <span>Row 8</span>
        <NextIcon />
      </div>

      <div class="knit-content">
        <div
          v-for="(stitch, index) in stitches"
          :key="Object.values(stitch).concat([index]).join('-')"
          :class="{ selected: selectedStitchIndex === index }"
          class="stitch-entry"
        >
          <div
            class="stitch-color"
            :style="{ backgroundColor: stitch.color }"
          />
          <span>{{ stitch.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrevIcon from 'vue-material-design-icons/ArrowLeftBold.vue';
import NextIcon from 'vue-material-design-icons/ArrowRightBold.vue';
import PanelButton from '../inputs/PanelButton.vue';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';
import PanelTimer from '../inputs/PanelTimer.vue';

export default {
  components: {
    PanelButton,
    PanelCheckbox,
    PanelTimer,
    PrevIcon,
    NextIcon,
  },
  data: () => ({
    row: 1,
    rowCount: 0,
    time: 0,
    selectedStitchIndex: 0,
  }),
  computed: {
    stitches() {
      return [
        { count: 2, color: '#ffffff' },
        { count: 4, color: '#0000ff' },
        { count: 2, color: '#ffffff' },
        { count: 25, color: '#00ff00' },
        { count: 8, color: '#0000ff' },
      ];
    },
  },
};
</script>

<style scoped>
.knit-session {
  display: flex;
}
.knit-helper-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.knit-timer {
  padding: 10px;
  border: 2px solid grey;
  border-radius: 5px;
}
.row-count {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
}
.knit-options {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 20px;
}
.knit-options > * {
  margin-top: 5px;
}
.knit-buttons {
  display: flex;
}
.knit-buttons > :first-child {
  margin-right: 5px;
}
.knit-panel {
  flex: 1;
  margin-left: 10px;
  height: 400px;
  max-height: 400px;
  border: 2px solid grey;
  border-radius: 5px;
  overflow-y: scroll;
}
.knit-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid grey;
  height: 38px;
  font-size: 20px;
  font-weight: bold;
}
.stitch-entry {
  height: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
}
.stitch-entry.selected {
  background-color: plum;
}
.stitch-color {
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 10px;
}
</style>
