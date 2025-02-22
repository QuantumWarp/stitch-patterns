<template>
  <div class="edit-settings">
    <PanelCheckbox
      label="Mirror X"
      :value="settings.mirrorX"
      @input="emit('onUpdate', { ...settings, mirrorX: $event })"
    />

    <PanelCheckbox
      label="Mirror Y"
      :value="settings.mirrorY"
      @input="emit('onUpdate', { ...settings, mirrorY: $event })"
    />

    <PanelCheckbox
      label="Rotate"
      :value="settings.rotate"
      @input="emit('onUpdate', { ...settings, rotate: $event })"
    />
  </div>
</template>

<script setup lang="ts">
import PanelCheckbox from '../inputs/PanelCheckbox.vue';
import type { Settings } from '../../models/settings.ts';

const emit = defineEmits<{ onUpdate: [settings: Settings] }>();
const { settings } = defineProps<{ settings: Settings }>();
</script>

<style scoped>
.edit-settings {
  display: flex;
  justify-content: space-between;
  padding: 25px 40px;
}
</style>
