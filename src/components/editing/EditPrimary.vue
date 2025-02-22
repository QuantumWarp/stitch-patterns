<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :value="pattern.name"
      @input="emit('onUpdate', { ...pattern, name: $event.toString() })"
    />

    <div class="buttons">
      <PanelButton @click="savePattern">
        Save
      </PanelButton>

      <PanelButton @click="savePattern" danger>
        Cancel
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersistanceStore } from '@/store/persistance.ts';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';
import type { Pattern } from '../../models/pattern.ts';

const persistanceStore = usePersistanceStore();
const { savePattern } = persistanceStore;

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
