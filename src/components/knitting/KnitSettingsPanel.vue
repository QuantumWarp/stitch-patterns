<template>
  <div class="knit-session">
    <div class="knit-timer">
      <PanelTimer
        :value="session.time"
        @input="session = { ...session, time: $event }"
      />
    </div>

    <div class="knit-options">
      <PanelCheckbox
        :disabled="session.time !== 0"
        :value="session.settings.fromTop"
        label="From Top"
        @input="session = {
          ...session,
          settings: { ...session.settings, fromTop: $event },
        }"
      />

      <PanelCheckbox
        :disabled="session.time !== 0"
        :value="session.settings.fromRight"
        label="From Right"
        @input="session = {
          ...session,
          settings: { ...session.settings, fromRight: $event},
        }"
      />

      <PanelCheckbox
        :disabled="session.time !== 0"
        :value="session.settings.reverseEven"
        label="Reverse Even"
        @input="session = {
          ...session,
          settings: { ...session.settings, reverseEven: $event},
        }"
      />

      <PanelCheckbox
        :disabled="session.time !== 0"
        :value="session.settings.doubleStitch"
        label="Double Stitch"
        @input="session = {
          ...session,
          settings: { ...session.settings, doubleStitch: $event},
        }"
      />
    </div>

    <div class="knit-buttons">
      <PanelButton
        danger
        @click="session = { ...session, ...defaultKnitSession() }"
      >
        Reset Knit
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelButton from '@/components/inputs/PanelButton.vue';
import PanelCheckbox from '@/components/inputs/PanelCheckbox.vue';
import PanelTimer from '@/components/inputs/PanelTimer.vue';

import type { KnitSession } from '@/models/knit.ts';
import { defaultKnitSession } from '@/helpers/knitting.helper.ts';

const session = defineModel<KnitSession>('session', { required: true });
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
