<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :value="pattern.name"
      @input="emit('onUpdate', { ...pattern, name: $event.toString() })"
    />

    <div class="buttons">
      <PanelButton @click="savePattern(pattern); router.push('/admin/list')">
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

const emit = defineEmits<{ onUpdate: [pattern: Pattern] }>();
const { pattern } = defineProps<{ pattern: Pattern }>();
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
