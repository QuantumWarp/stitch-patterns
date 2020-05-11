<template>
  <div class="general-settings">
    <PanelCheckbox
      label="Mirror X"
      :value="settings.mirrorX"
      @input="updateSettings({ mirrorX: $event })"
    />

    <PanelCheckbox
      label="Mirror Y"
      :value="settings.mirrorY"
      @input="updateSettings({ mirrorY: $event })"
    />

    <PanelCheckbox
      label="Rotate"
      :value="settings.rotate"
      @input="updateSettings({ rotate: $event })"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

export default {
  components: {
    PanelCheckbox,
  },
  computed: {
    ...mapGetters(['settings']),
  },
  methods: {
    ...mapActions(['updateSettings']),
  },
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
