<template>
  <div class="knit-session">
    <div class="knit-timer">
      <div class="row-count">
        Total - {{ trackedRowCount }}
      </div>

      <PanelTimer
        :value="time"
        @input="updateTime"
      />
    </div>

    <div class="knit-options">
      <PanelCheckbox
        :value="knitSettings.fromTop"
        label="From Top"
        @input="updateKnitSettings({ fromTop: $event })"
      />

      <PanelCheckbox
        :value="knitSettings.fromRight"
        label="From Right"
        @input="updateKnitSettings({ fromRight: $event })"
      />

      <PanelCheckbox
        :value="knitSettings.reverseEven"
        label="Reverse Even"
        @input="updateKnitSettings({ reverseEven: $event })"
      />

      <PanelCheckbox
        :value="knitSettings.doubleStitch"
        label="Double Stitch"
        @input="updateKnitSettings({ doubleStitch: $event })"
      />
    </div>

    <div class="knit-buttons">
      <PanelButton @click="exportKnitPattern()">
        Export
      </PanelButton>

      <PanelButton
        danger
        @click="resetKnitSession"
      >
        Reset Knit
      </PanelButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelButton from '../inputs/PanelButton.vue';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';
import PanelTimer from '../inputs/PanelTimer.vue';

export default {
  components: {
    PanelButton,
    PanelCheckbox,
    PanelTimer,
  },
  computed: {
    ...mapGetters([
      'time',
      'knitSettings',
      'pattern',
      'knitPattern',
      'trackedRowCount',
    ]),
  },
  watch: {
    pattern() {
      this.resetKnitSession();
    },
    knitPattern() {
      this.resetKnitSession({ resetTime: false });
    },
  },
  methods: {
    ...mapActions([
      'resetKnitSession',
      'updateKnitSettings',
      'updateTime',
      'exportKnitPattern',
      'resetKnitSession',
    ]),
  },
};
</script>

<style scoped>
.knit-session {
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
</style>
