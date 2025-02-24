<template>
  <div class="edit-settings">
    <PanelCheckbox
      label="Mirror X"
      :value="settings.mirrorX"
      @input="settings = { ...settings, mirrorX: $event }"
    />

    <PanelCheckbox
      label="Mirror Y"
      :value="settings.mirrorY"
      @input="settings = { ...settings, mirrorY: $event }"
    />

    <PanelCheckbox
      label="Rotate"
      :value="settings.rotate"
      @input="settings = { ...settings, rotate: $event }"
    />
  </div>
</template>

<script setup lang="ts">
import PanelCheckbox from '@/components/inputs/PanelCheckbox.vue';

import type { EditSettings } from '@/models/settings.ts';

const settings = defineModel<EditSettings>('settings', { required: true });
</script>

<style scoped>
.edit-settings {
  display: flex;
  justify-content: space-between;
  padding: 25px 40px;
}
</style>
