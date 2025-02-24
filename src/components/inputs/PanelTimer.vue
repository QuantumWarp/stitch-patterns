<template>
  <div class="panel-timer">
    <div class="value">
      <span
        v-if="breakdown.days"
        class="days"
      >{{ breakdown.days }} Day{{ breakdown.days > 1 ? 's' : '' }}</span>
      <span
        class="time"
        :class="{ hide: breakdown.days }"
      >
        {{ breakdown.hours }}:{{ breakdown.minutes }}:{{ breakdown.seconds }}
      </span>
    </div>

    <div class="buttons">
      <PanelButton @click="stopped ? start() : stop()">
        {{ stopped ? 'Start' : 'Stop' }}
      </PanelButton>

      <PanelButton
        danger
        @click="reset()"
      >
        Reset
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import PanelButton from './PanelButton.vue';

const { value } = defineProps<{ value: number }>();
const emit = defineEmits<{ input: [value: number] }>();

const stopped = ref(true);
const breakdown = ref({
  days: 0,
  hours: '00',
  minutes: '00',
  seconds: '00',
});

const valueAtLastStart = ref(value);
const lastStartDate = ref(0);
const timeout = ref<number>();

watchEffect(() => {
  let time = value;
  breakdown.value.days = Math.floor(time / 86400000);
  time %= 86400000;
  const hours = Math.floor(time / 3600000);
  breakdown.value.hours = hours < 10 ? `0${hours}` : hours.toString();
  time %= 3600000;
  const minutes = Math.floor(time / 60000);
  breakdown.value.minutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  time %= 60000;
  const seconds = Math.floor(time / 1000);
  breakdown.value.seconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  if (value === 0) {
    clearTimeout(timeout.value);
    stopped.value = true;
  }
});

const start = () => {
  valueAtLastStart.value = value;
  lastStartDate.value = Date.now();
  emit('input', value + 1);
  setupNextTick(value);
  stopped.value = false;
};

const stop = () => {
  clearTimeout(timeout.value);
  processTick();
  stopped.value = true;
};

const reset = () => {
  valueAtLastStart.value = 0;
  lastStartDate.value = Date.now();
  emit('input', 0);
};

const setupNextTick = (val: number) => {
  const millisToWait = 1001 - (val % 1000);
  timeout.value = setTimeout(() => {
    const nextVal = processTick();
    setupNextTick(nextVal);
  }, millisToWait);
};

const processTick = () => {
  const nextValue = valueAtLastStart.value + (Date.now() - lastStartDate.value);
  emit('input', nextValue);
  return nextValue;
};
</script>

<style scoped>
.panel-timer > .value {
  font-weight: bold;
  font-size: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 5px;
}
.value > * {
  text-align: center;
  width: 100%;
}
.time.hide {
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s;
}
.time.hide:hover {
  opacity: 1;
}
.buttons {
  display: flex;
}
.buttons > button {
  flex: 1;
}
.buttons > :first-child {
  margin-right: 5px;
}
</style>
