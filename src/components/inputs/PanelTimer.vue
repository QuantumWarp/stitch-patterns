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

<script>
import PanelButton from './PanelButton.vue';

export default {
  components: {
    PanelButton,
  },
  props: {
    value: { type: Number, required: true },
  },
  data: () => ({
    stopped: true,
    breakdown: {
      days: 0,
      hours: '00',
      minutes: '00',
      seconds: '00',
    },
  }),
  watch: {
    value: {
      immediate: true,
      handler() {
        let time = this.value;
        this.breakdown.days = Math.floor(time / 86400000);
        time %= 86400000;
        const hours = Math.floor(time / 3600000);
        this.breakdown.hours = hours < 10 ? `0${hours}` : hours;
        time %= 3600000;
        const minutes = Math.floor(time / 60000);
        this.breakdown.minutes = minutes < 10 ? `0${minutes}` : minutes;
        time %= 60000;
        const seconds = Math.floor(time / 1000);
        this.breakdown.seconds = seconds < 10 ? `0${seconds}` : seconds;

        if (this.value === 0) {
          clearTimeout(this.timeout);
          this.stopped = true;
        }
      },
    },
  },
  methods: {
    start() {
      this.valueAtLastStart = this.value;
      this.lastStartDate = Date.now();
      this.$emit('input', this.value + 1);
      this.setupNextTick(this.value);
      this.stopped = false;
    },
    stop() {
      clearTimeout(this.timeout);
      this.processTick();
      this.stopped = true;
    },
    reset() {
      this.valueAtLastStart = 0;
      this.lastStartDate = Date.now();
      this.$emit('input', 0);
    },
    setupNextTick(val) {
      const millisToWait = 1001 - (val % 1000);
      this.timeout = setTimeout(() => {
        const nextVal = this.processTick();
        this.setupNextTick(nextVal);
      }, millisToWait);
    },
    processTick() {
      const nextValue = this.valueAtLastStart + (Date.now() - this.lastStartDate);
      this.$emit('input', nextValue);
      return nextValue;
    },
  },
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
  background-color: white;
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
