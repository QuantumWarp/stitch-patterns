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
        :disabled="time !== 0"
        :value="knitSettings.highlightRow"
        label="Highlight Row"
        @input="updateKnitSettings({ highlightRow: $event })"
      />

      <PanelCheckbox
        :disabled="time !== 0"
        :value="knitSettings.fromTop"
        label="From Top"
        @input="updateKnitSettings({ fromTop: $event })"
      />

      <PanelCheckbox
        :disabled="time !== 0"
        :value="knitSettings.fromRight"
        label="From Right"
        @input="updateKnitSettings({ fromRight: $event })"
      />

      <PanelCheckbox
        :disabled="time !== 0"
        :value="knitSettings.reverseEven"
        label="Reverse Even"
        @input="updateKnitSettings({ reverseEven: $event })"
      />

      <PanelCheckbox
        :disabled="time !== 0"
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
        @click="resetKnitSession()"
      >
        Reset Knit
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useKnittingStore } from '@/store/knitting';
import { usePatternStore } from '@/store/pattern';
import { usePersistanceStore } from '@/store/persistance';

import PanelButton from '../inputs/PanelButton.vue';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';
import PanelTimer from '../inputs/PanelTimer.vue';
import { watch } from 'vue';

const knittingStore = useKnittingStore();
const { time, knitSettings, knitPattern, trackedRowCount } = storeToRefs(knittingStore);
const { resetKnitSession, updateKnitSettings, updateTime } = knittingStore;

const patternStore = usePatternStore();
const { pattern } = storeToRefs(patternStore);

const persistanceStore = usePersistanceStore();
const { exportKnitPattern } = persistanceStore;

watch(pattern, () => resetKnitSession());
watch(knitPattern, () => resetKnitSession({ resetTime: false }));
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

.knit-options>* {
  margin-top: 5px;
}

.knit-buttons {
  display: flex;
}

.knit-buttons> :first-child {
  margin-right: 5px;
}
</style>
