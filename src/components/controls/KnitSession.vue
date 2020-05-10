<template>
  <div class="knit-session">
    <div class="knit-timer">
      <div class="row-count">
        Total - {{ rowCount }}
      </div>

      <PanelTimer
        v-model="time"
      />
    </div>

    <div class="knit-options">
      <PanelCheckbox
        :value="form.fromTop"
        label="From Top"
        @input="updateKnitSettings({ fromTop: $event })"
      />

      <PanelCheckbox
        :value="form.fromRight"
        label="From Right"
        @input="updateKnitSettings({ fromRight: $event })"
      />

      <PanelCheckbox
        :value="form.reverseEven"
        label="Reverse Even"
        @input="updateKnitSettings({ reverseEven: $event })"
      />

      <PanelCheckbox
        :value="form.doubleStitch"
        label="Double Stitch"
        @input="updateKnitSettings({ doubleStitch: $event })"
      />
    </div>

    <div class="knit-buttons">
      <PanelButton>
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
  data: () => ({
    form: {
      fromTop: false,
      fromRight: false,
      reverseEven: true,
      doubleStitch: true,
    },
    rowCount: 0,
    time: 0,
  }),
  computed: {
    ...mapGetters(['knitSettings']),
    stitches() {
      return this.knitPattern[this.selectedRow];
    },
  },
  watch: {
    knitSettings: {
      immediate: true,
      handler(val) {
        this.form = { ...val };
      },
    },
  },
  methods: {
    ...mapActions([
      'resetKnitSession',
      'updateKnitSettings',
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
