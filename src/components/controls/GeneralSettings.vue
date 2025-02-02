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

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/store/settings';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

const settingsStore = useSettingsStore();
const { settings } = storeToRefs(settingsStore);
const { updateSettings } = settingsStore;
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
