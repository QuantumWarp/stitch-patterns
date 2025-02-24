<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :model-value="pattern.name"
      @input="pattern = { ...pattern, name: $event.target.value.toString() }"
    />

    <div class="buttons">
      <PanelButton @click="save">
        Save
      </PanelButton>

      <PanelButton danger @click="router.push('/admin/list')">
        Cancel
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';
import type { Pattern } from '../../models/pattern.ts';
import { savePattern } from '../../storage/pattern.storage.ts';
import { router } from '@/router.ts'

const pattern = defineModel<Pattern>("pattern", { required: true });

function save() {
  const newPattern = { ...pattern.value, name: pattern.value.name.trim() || "New Pattern" };
  savePattern(newPattern);
  router.push('/admin/list')
}
</script>

<style scoped>
.primary-info {
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.buttons > :not(:last-child) {
  margin-right: 5px;
}
</style>
