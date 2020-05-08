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

    <PanelButton>
      Apply
    </PanelButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';

export default {
  components: {
    PanelButton,
    PanelInput,
  },
  data: () => ({
    form: {
      height: '',
      width: '',
    },
  }),
  computed: {
    ...mapGetters(['dimensions']),
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
</style>
