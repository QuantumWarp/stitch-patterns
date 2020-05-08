<template>
  <div class="dimension-adjuster">
    <PanelInput
      v-model="form.height"
      type="number"
      label="Height"
    />

    <PanelInput
      v-model="form.width"
      type="number"
      label="Width"
    />

    <div class="buttons">
      <PanelButton
        :danger="potentiallyDangerous"
        @click="adjustDimensions(form)"
      >
        Apply
      </PanelButton>

      <PanelButton
        danger
        @click="adjustDimensions({ height: 30, width: 30 })"
      >
        Reset
      </PanelButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';

export default {
  components: {
    PanelButton,
    PanelInput,
  },
  data: () => ({
    form: {
      height: 30,
      width: 30,
    },
  }),
  computed: {
    ...mapGetters(['dimensions']),
    potentiallyDangerous() {
      return this.form.height < this.dimensions.height
        || this.form.width < this.dimensions.width;
    },
  },
  watch: {
    dimensions: {
      immediate: true,
      handler(val) {
        this.form.height = val.height;
        this.form.width = val.width;
      },
    },
  },
  methods: {
    ...mapActions(['adjustDimensions']),
  },
};
</script>

<style scoped>
.dimension-adjuster {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dimension-adjuster > *:not(:last-child) {
  margin-bottom: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.buttons :first-child {
  margin-right: 6px;
}
</style>
