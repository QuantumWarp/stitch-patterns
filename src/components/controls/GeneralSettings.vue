<template>
  <div class="general-settings">
    <PanelCheckbox
      v-model="form.mirrorX"
      label="Mirror X"
    />

    <PanelCheckbox
      v-model="form.mirrorY"
      label="Mirror Y"
    />

    <PanelCheckbox
      v-model="form.rotate"
      label="Rotate"
    />
  </div>
</template>

<script>
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

export default {
  components: {
    PanelCheckbox,
  },
  data: () => ({
    form: {
      mirrorX: false,
      mirrorY: false,
      rotate: false,
    },
  }),
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
