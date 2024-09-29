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
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/store/settings/state';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

export default {
  components: {
    PanelCheckbox,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const { settings } = storeToRefs(settingsStore);
    const { updateSettings } = settingsStore;

    return {
      settings,
      updateSettings,
    };
  },
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
