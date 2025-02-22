<template>
  <div class="primary-info">
    {{ pattern.name }}

    <div class="buttons">
      <PanelButton @click="$router.push('/admin/list')">
        Pattern List
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelButton from '../inputs/PanelButton.vue';
import type { Pattern } from '../../models/pattern.ts';

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
